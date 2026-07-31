def format_result(result: dict):

    formatted = {}

    for key, value in result.items():

        if isinstance(value, float):
            formatted[key] = round(value, 2)

        else:
            formatted[key] = value

    return formatted