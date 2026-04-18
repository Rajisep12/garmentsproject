from django import template
from num2words import num2words

register = template.Library()


@register.filter
def round_off(value):
    if value is None:
        return 0
    rounded = round(value)
    return round(rounded - value, 2)


@register.filter
def amount_in_words(value):
    if value is None:
        return ""
    try:
        word = num2words(int(value), lang='en_IN').title() + " Rupees Only"
        print("word",word)
        return num2words(int(value), lang='en_IN').title() + " Rupees Only"
    except:
        return ""

@register.filter
def round_total(value):
    if value is None:
        return 0
    return round(value)

@register.filter
def sum_amt(items):
    return sum(item.amt or 0 for item in items)

@register.filter
def sum_discount(items):
    return sum(item.discount or 0 for item in items)

@register.filter
def sum_qty(items):
    return sum(item.qty or 0 for item in items)

    
@register.filter
def indian_currency(value):
    if value is None:
        return "0.00"
    try:
        value = float(value)

        # Format to always have 2 decimal places
        formatted_value = f"{value:.2f}"

        # Split integer and decimal parts
        integer_part, decimal_part = formatted_value.split(".")

        integer_part = int(integer_part)
        s = str(integer_part)

        # Indian comma format
        if len(s) > 3:
            last3 = s[-3:]
            rest = s[:-3]
            rest = ",".join(
                [rest[max(i-2, 0):i] for i in range(len(rest), 0, -2)][::-1]
            )
            formatted = rest + "," + last3
        else:
            formatted = s

        return f"{formatted}.{decimal_part}"

    except:
        return "0.00"