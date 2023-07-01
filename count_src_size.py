import os

def count_lines(filepath):
    with open(filepath, 'r') as file:
        lines = file.readlines()
        return len(lines)

def count_lines_in_directory(directory):
    total_lines = 0
    extensions = ['.html', '.css', '.js']

    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(extension) for extension in extensions):
                filepath = os.path.join(root, file)
                print(filepath);
                lines = count_lines(filepath)
                total_lines += lines

    return total_lines

# ディレクトリのパスを指定
directory_path = './'

total_lines = count_lines_in_directory(directory_path)
print(f'Total lines: {total_lines}')