import os,shutil

def alterFile(path):
	data = ""
	with open(path,'r') as f:
		list = f.read();
		if not list.find("resource/default.res.json") == -1:
			list = list.replace(r"resource/default.res.json","123456789",1)
			data += list;
			print(data);
			with open(path,'w') as f:
				f.write(data)	

	
path = r".\main.min_5b4baa4b.js"
alterFile(path)