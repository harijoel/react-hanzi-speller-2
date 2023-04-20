import json
import glob

def convertor(filename):
    hsk_level = filename[3]

    f = open(f"HSK{hsk_level}.txt", encoding='UTF-8-sig')

    hskjson = {
    "metadata": {
        "identifier": f"HSK{hsk_level}", 
        "count": 2002, 
        "source-note": "vocabulary taken from http://data.hskhsk.com/lists/ created by Alan Davies"
    }, 
    "words": []
    }

    count = 0
    for line in f:
        lineli = line.rstrip().split('\t')
        wordObj = {
            "metadata": {
                "id": count
            }, 
            "translation-data": {
                "english": lineli[-1], 
                "pinyin-numbered": lineli[2],
                "pinyin": lineli[3],
                "simplified": lineli[0],
                "traditional": lineli[1]
            }
        }
        
        hskjson["words"].append(wordObj)
        
        count = count + 1
    hskjson["metadata"]["count"] = count
    f.close()

    j = open(f"hsk-{hsk_level}.json", "w", encoding='utf8')
    json.dump(hskjson, j, ensure_ascii=False, indent=4)
    #j.write(json.dumps(hskjson, ensure_ascii=False))
    j.close()
    pass

txtFilenames = glob.glob("*.txt")
# for filename in txtFilenames:
#     convertor(filename)

# convertor("HSK1.txt")