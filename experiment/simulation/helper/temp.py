import os
def html(name):
    return '''
     <img
        class="main-window-imgs"
        src="./src/images/new/{0}"
    />
    '''.format(name)

def src(name :str, count = "index++"):
    return name[0:name.find('.')] + f":this.allImgsDom[{count}],\n"


def dom(name):
    name1 = name[0: name.find(".")]
    return f'{name1} : new Dom("{name1}"),\n'

# index count
# count = "index++"
count = 192

# project name
code = 14

# sneha_folder_path = "E:\\office project\\vlabs-EE\\EE17\\src\\images\\EE17\\"

utkarsh_folder_path = f"C:\\Users\\Predator Helios\\Documents\\Office Work\\local\\vlabs-EE\\EE{code}\\src\\images\\new\\"


# utkarsh_folder_path = "S:\\Users\\Utkarsh\\Documents\\Office Main\\All Projects Repo\\vlabs-EE\\EE4\\src\\images\\exp4\\part2\\"

# names = os.listdir(sneha_folder_path)
names = os.listdir(utkarsh_folder_path)

# namesStr = ''
# for name in names:
#     namesStr = namesStr + f'{name}\n'

# open("temp3.txt","w").write(namesStr)

# BASE_COUNT = 13
# count = 168

srcs = ''
doms = ''
htms = ''
for i in range(len(names)):
    htms = htms + html(names[i])
    doms = doms + dom(names[i])
    srcs = srcs + src(names[i], count)
    count += 1

        


# open("temp.txt","w").write()
allItems = f'{htms}\n\n{srcs}\n\n{doms}'
open("temp2.txt","w").write(allItems)

print("Done 👍")
# print(os.__path__)
#            