import csv
import json
import os
import argparse

def generate_factions(csv_filename, target_party):
    output_dir = 'factions_output'
    os.makedirs(output_dir, exist_ok=True)
    
    # Define which CSV columns belong inside the nested "links" object
    link_columns = {'website', 'facebook', 'twitter', 'instagram', 'telegram', 'wikipedia'}
    
    # Define keys that are handled by this code explicitly (so we don't duplicate them in the generic copy)
    explicit_keys = {'party', 'logo', 'supporters', 'tags'} | link_columns

    with open(csv_filename, mode='r', encoding='utf-8-sig') as csvfile:
        reader = csv.reader(csvfile)
        
        # 1. Ignore the first two lines
        try:
            next(reader)
            next(reader)
        except StopIteration:
            print("Error: CSV file does not contain enough rows.")
            return

        # 2. Read the 3rd line for column names and stop at the first empty column
        raw_headers = next(reader)
        headers = []
        for col in raw_headers:
            if not col.strip():
                break
            headers.append(col.strip())
        valid_col_count = len(headers)

        idx = 0  # Running index for the files

        for row in reader:
            if not row:
                continue
                
            # Slice the row to ignore columns beyond the empty header, padding if necessary
            row_data = row[:valid_col_count]
            row_data += [''] * (valid_col_count - len(row_data))
            row_dict = dict(zip(headers, row_data))
            
            csv_party = row_dict.get('party', '').strip()
            
            # 3. Process only if the party matches the target or is "all"
            if csv_party == target_party or csv_party.lower() == 'all':
                idx += 1

                file_id = f"{target_party}-{idx:03d}"
                json_data = {}
                
                # Base fields
                json_data['id'] = file_id
                json_data['party'] = target_party
                
                # Copy all other generic fields from CSV to JSON
                for key, value in row_dict.items():
                    if key not in explicit_keys:
                        json_data[key] = value.strip()
                
                # Handle Logo prefix logic
                logo = row_dict.get('logo', '').strip()
                if logo and not logo.lower().startswith('http'):
                    logo = f"/faction_logos/{logo}"
                json_data['logo'] = logo
                
                # Handle Links object
                links_dict = {}
                for link_key in link_columns:
                    if link_key in row_dict:
                        link_val = row_dict[link_key].strip()
                        if link_val:  # Only add if not empty
                            links_dict[link_key] = link_val
                json_data['links'] = links_dict
                
                # Hardcoded future-use fields
                json_data['supporters'] = "unknown"
                json_data['tags'] = []
                
                # Write to file
                output_path = os.path.join(output_dir, f"{file_id}.json")
                with open(output_path, 'w', encoding='utf-8') as jsonfile:
                    json.dump(json_data, jsonfile, indent=2, ensure_ascii=False)
                    
                print(f"Wrote {output_path}")
                
    print(f"Success: Generated {idx} JSON files in the '{output_dir}' folder.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate JSON files from a political factions CSV.")
    parser.add_argument("csv_file", help="Path to the input CSV file")
    parser.add_argument("party_name", help="The name of the party to process (e.g., 'likud')")
    
    args = parser.parse_args()
    generate_factions(args.csv_file, args.party_name)