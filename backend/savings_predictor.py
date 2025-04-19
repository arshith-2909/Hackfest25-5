
import pandas as pd
import numpy as np

def calculate_savings(salary, this_month, last_month):
    """Calculate savings and predictions based on spending data"""
    total_spending = sum(this_month.values())
    current_savings = max(0, salary - total_spending)
    categories = ["Recharge", "Food", "Grocery", "Bills"]
    spending_df = pd.DataFrame({
        'Category': categories,
        'ThisMonth': [this_month.get(cat, 0) for cat in categories],
        'LastMonth': [last_month.get(cat, 0) for cat in categories]
    })
    spending_df['Change'] = spending_df.apply(
        lambda row: calculate_change_percentage(row['ThisMonth'], row['LastMonth']),
        axis=1
    )
    spending_df['PredictedSpending'] = spending_df.apply(
        lambda row: predict_future_spending(row['ThisMonth'], row['Change']),
        axis=1
    )
    highest_spending_cat = spending_df.loc[spending_df['ThisMonth'].idxmax()]['Category']
    highest_spending_amount = spending_df['ThisMonth'].max()
    predicted_total_spending = spending_df['PredictedSpending'].sum()
    predicted_savings = max(0, min(salary, salary - predicted_total_spending))
    return {
        'salary': salary,
        'total_spending': total_spending,
        'current_savings': current_savings,
        'savings_percentage': (current_savings / salary * 100) if salary > 0 else 0,
        'highest_spending': {
            'category': highest_spending_cat,
            'amount': highest_spending_amount
        },
        'predicted_future_savings': predicted_savings,
        'spending_table': spending_df[['Category', 'ThisMonth', 'PredictedSpending']]
    }

def calculate_change_percentage(this_month, last_month):
    """Calculate percentage change in spending"""
    if last_month == 0:
        return 100 if this_month > 0 else 0
    return ((this_month - last_month) / last_month) * 100

def predict_future_spending(current_spending, change_percentage):
    """Predict future spending based on trend"""
    if change_percentage > 0:
        damping_factor = 0.7
        predicted_increase = current_spending * (change_percentage / 100) * damping_factor
        return current_spending + predicted_increase
    elif change_percentage < 0:
        damping_factor = 0.5
        predicted_decrease = current_spending * (abs(change_percentage) / 100) * damping_factor
        return max(0, current_spending - predicted_decrease)
    else:
        return current_spending

def generate_report(results):
    """Generate a human-readable report"""
    report = [
        f"\n====== MONTHLY SAVINGS ANALYSIS ======",
        f"\nSalary: ₹{results['salary']:.2f}",
        f"Total Spending: ₹{results['total_spending']:.2f}",
        f"Current Savings: ₹{results['current_savings']:.2f} ({results['savings_percentage']:.1f}% of salary)",
        f"\nHighest Spending Category: {results['highest_spending']['category']} (₹{results['highest_spending']['amount']:.2f})",
        f"\nPredicted Future Savings: ₹{results['predicted_future_savings']:.2f}\n",
        f"\n===== SPENDING BREAKDOWN =====\n"
    ]
    table = results['spending_table'].copy()
    table.columns = ['Category', 'This Month (₹)', 'Predicted Next Month (₹)']
    table['This Month (₹)'] = table['This Month (₹)'].apply(lambda x: f"₹{x:.2f}")
    table['Predicted Next Month (₹)'] = table['Predicted Next Month (₹)'].apply(lambda x: f"₹{x:.2f}")
    report.append(table.to_string(index=False))
    return "\n".join(report)

def main():
    print("\n=== MONTHLY SAVINGS CALCULATOR ===\n")
    print("Please enter all your financial information below:")
    try:
        salary = float(input("Your monthly salary: "))
        print("\nEnter your spending for THIS MONTH:")
        this_month_recharge = float(input("Recharge: "))
        this_month_food = float(input("Food: "))
        this_month_grocery = float(input("Grocery: "))
        this_month_bills = float(input("Bills: "))
        print("\nEnter your spending for LAST MONTH:")
        last_month_recharge = float(input("Recharge: "))
        last_month_food = float(input("Food: "))
        last_month_grocery = float(input("Grocery: "))
        last_month_bills = float(input("Bills: "))
        this_month = {
            "Recharge": this_month_recharge,
            "Food": this_month_food,
            "Grocery": this_month_grocery,
            "Bills": this_month_bills
        }
        last_month = {
            "Recharge": last_month_recharge,
            "Food": last_month_food,
            "Grocery": last_month_grocery,
            "Bills": last_month_bills
        }
        results = calculate_savings(salary, this_month, last_month)
        report = generate_report(results)
        print(report)
    except ValueError as e:
        print(f"\nError: Please enter valid numbers for all inputs.")
    except Exception as e:
        print(f"\nAn error occurred: {e}")

if __name__ == "__main__":
    main()
