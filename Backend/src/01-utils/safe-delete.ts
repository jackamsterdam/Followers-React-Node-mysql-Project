import fs from 'fs'

function safeDelete(fullPath: string) {
    try {
         if (!fullPath || !fs.existsSync(fullPath)) return 

         fs.unlinkSync(fullPath)

    } catch (err: any) {
        //no need to display anything
    }
  
}

export default safeDelete 


// assf
// import fs from "fs";
// import fsP from "fs/promises";

// function safeDelete(fullPath: string) {
//   try {

//     if(!fullPath) return;

//     if (!fullPath || !fs.existsSync(fullPath)) return;

//     //  fs.unlinkSync(fullPath)

//     fs.unlink(fullPath, () => {});

//   } catch (err: any) {
//     //no need to display anything
//   }
// }

// export default safeDelete;