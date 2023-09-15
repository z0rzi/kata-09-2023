import pandas as pd


def validate_data(data: list):
    df = pd.DataFrame(data, columns=["transaction_id", "date", "price", "category", "description"])
    df["date"] = pd.to_datetime(df["date"], format="%Y-%m-%d")
    df["month"] = df["date"].dt.month
    df['year'] = df['date'].dt.year

    grouped_df = df.groupby(["month", "category", "transaction_id"])['price'].sum().reset_index()
    grouped_df['percentage_change'] = grouped_df.groupby("category")['price'].pct_change().fillna(0)
    grouped_df['month_diff'] = grouped_df.groupby("category")["month"].diff().fillna(0)
    result_df = grouped_df.query("percentage_change >= 0.5 & month_diff==1.0")
    res =[]
    for i, d in result_df.iterrows():
        res.append(
            {
                "month": d["month"],
                "price": d["price"],
                "category": d["category"],
                "percentage_change": d["percentage_change"],
                "transaction_id": d["transaction_id"]
            }
        )
    return res


def create_email_text(res):
    text = """Hello Dear User!
    
    We have detected unusually high spending on your card in these categories: 

    """
    for i in res:
        text+=f"transaction_id: {i['transaction_id']}, price: {i['price']}, pct_change: {round(i['percentage_change'], 2)} category: {i['category']}, month: {i['month']} \n"

    text += "\nLove,\n\nThe Credit Card Company"
    return text

