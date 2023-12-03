import json
import uuid
import random

categories_file_path = "./categories.json";

with open(categories_file_path, 'r', encoding='utf-8') as file:
    all_categories = json.load(file)

# Filter out the lowest-level categories (those which are not parents to any other category)
lowest_level_categories = [cat for cat in all_categories if not any(c['parentId'] == cat['_id'] for c in all_categories)]

for item in lowest_level_categories:
    print(item);


def generate_realistic_product(category_id, category_title):
    product_details = {
        # Example details for different categories, add more as needed
       'Câine junior': {
            "name": "Hrană uscată pentru câini junior - Carne de vită și orez 10kg",
            "description": "Hrană completă pentru câini tineri, îmbogățită cu vitamine și minerale."
        },
        'Câine adult': {
            "name": "Hrană umedă pentru câini adulți - Pui și legume 400g",
            "description": "Hrană umedă sănătoasă, fără coloranți și conservanți artificiali."
        },
        'Câine senior': {
            "name": "Hrană specială pentru câini seniori - Somon și orez brun 12kg",
            "description": "Hrană adaptată nevoilor câinilor în vârstă, cu un conținut redus de grăsimi."
        },
        'Antiparazitare': {
            "name": "Soluție antiparazitară pentru câini - 50ml",
            "description": "Protejează eficient împotriva paraziților externi și interni."
        },
        'Igienă câini': {
            "name": "Șampon pentru câini - Aloe Vera 250ml",
            "description": "Șampon delicat, ideal pentru pielea sensibilă a câinilor."
        },
        'Vitamine câini': {
            "name": "Suplimente nutritive pentru câini - Vitamine și minerale 100 tablete",
            "description": "Complex de vitamine și minerale pentru sănătatea câinului tău."
        },
        'Pisică junior': {
            "name": "Hrană uscată pentru pisici junior - Somon 5kg",
            "description": "Hrană echilibrată pentru creșterea sănătoasă a pisicilor tinere."
        },
        'Pisică Adult': {
            "name": "Hrană umedă pentru pisici adulte - Pui și curcan 300g",
            "description": "Hrană de înaltă calitate pentru pisici adulte, bogată în proteine."
        },
        # ... Add more category-specific details here
    }

    selected_details = product_details.get(category_title, {
        "name": f"Produs generic pentru {category_title}",
        "description": f"Descriere generică pentru {category_title}."
    })

    return {
        "_id": {"$oid": uuid.uuid4().hex[:24]},
        "user": {"$oid": "64d7b2b6219588d6fe9b2015"},
        "name": selected_details["name"],
        "category": {"$oid": category_id},
        "price": "{:.2f}".format(random.uniform(10, 100)),
        "images": [],
        "description": selected_details["description"]
    }


generated_products = [generate_realistic_product(cat['_id']['$oid'], cat['title']) for cat in lowest_level_categories]

# Save to JSON file
with open('generated_products.json', 'w', encoding='utf-8') as file:
    json.dump(generated_products, file, indent=4, ensure_ascii=False)

print("JSON file generated successfully.")
