import pandas as pd


def validate_data(data: list):
    df = pd.DataFrame(data)
    df["month"] = df["date"].dt.month
    grouped_df = df.groupby(["month", "category"])['price'].sum().reset_index()
    grouped_df['percentage_change'] = grouped_df.groupby('category')['price'].pct_change()
    result_df = grouped_df[grouped_df['percentage_change'] >= 0.5]
    res =[]
    for i, d in result_df.iterrows():
        res.append(
            {
                "month": d["month"],
                "price": d["price"],
                "category": d["category"],
                "percentage_change": d["percentage_change"]
            }
        )
    return res
