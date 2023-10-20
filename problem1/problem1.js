const fs = require('fs');
const writeFile1= "writeFile1.json";
const writeFile2= "writeFile2.json";
const writeFile3= "writeFile3.json";

fs.writeFile (writeFile1,'Function',(err,data)=>{
    if(err){
        console.log("error in Writing writeFile1")
    }
    else{
        console.log("writeFile1 successfull");
        
        fs.writeFile(writeFile2,'Function',(err,data)=>{
            if(err){
                console.log("error in Writing_writeFile2")
            }
            else{
                console.log("writeFile2 successfull");
                
                fs.writeFile(writeFile3,'Function',(err,data)=>{
                if(err){
                    console.log("error in Writing_writeFile3")
                }
                else{
                    console.log("writeFile3 successfull");
                    
                    fs.unlink (writeFile1,(err,data)=>{
                    if(err){
                        console.log("error in unlinked writeFile1")
                    }
                    else{
                        console.log("writeFile1 deleted");
                        
                        fs.unlink(writeFile2,(err,data)=>{
                        if(err){
                            console.log("error in unlinked_writeFile2")
                        }
                        else{
                            console.log("writeFile2 deleted");
                            
                            fs.unlink(writeFile3,(err,data)=>{
                                if(err){
                                    console.log("error in unlinked_writeFile3")
                                }
                                else{
                                   console.log("writeFile3 deleted")
                                }
                                
                            }
                            );
                           
                        }
                        
                    }
                    );
                       
                    }
                    
                }
                );
    
                   
                }
                
            }
            );
               
            }
            
        }
        );
       
    }
    
}

    
);