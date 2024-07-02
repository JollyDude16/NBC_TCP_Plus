import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import protobuf from 'protobufjs'
import { packetNames } from '../protobuf/packetNames.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 최상위 경로
const protoDir = path.join(__dirname, '../protobuf');


//.proto확장자를 가진 경로 상의 파일을 전부 뽑아라
const getAllProtoFiles = (dir, fileList =[]) =>{
    const files = fs.readdirSync(dir);

    files.forEach((file)=>{
        const filePath = path.join(dir, file);

        //statSync? 파일패스에 있는 이게 파일인지 폴더인지 확인해라
        //디렉토리라면, 재귀함수로 호출
        if(fs.statSync(filePath).isDirectory()){
            getAllProtoFiles(filePath, fileList);
        }
        else if (path.extname(file)==='.proto'){
            fileList.push(filePath);
        }
    })

    return fileList;
}

const protoFiles = getAllProtoFiles(protoDir);


const protoMessages = {}

export const loadProtos = async () =>{
    try{
        const root = new protobuf.Root();
        await Promise.all(protoFiles.map((file)=>root.load(file)));

        for(const [packageName, types] of Object.entries(packetNames)){
            protoMessages[packageName] = {};
            for(const [type,typeName] of Object.entries(types)){
                protoMessages[packageName][type] = root.lookupType(typeName);
            }
        }

        console.log('Protobuf 파일이 로드 되었습니다.')
    }
    catch(error){
        console.log('Protobuf 파일 로드 중 오류가 발생했습니다.', error)
    }

}