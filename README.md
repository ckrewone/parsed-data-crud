# parsed-data-crud

The API is able to create/update/delete/find an object. We can set and get an object in xml/json alternately.
#### Used technologies :
- Node.js
- TypeScript
- MySQL
- Express.js


###  API

 `/object` `GET`/`POST`/`PATCH`/`DELETE`
 
 `GET` 
    
    headers:
        Content-Accept: application/json | application/xml
    
    query param:
        id : UUIDv4
     
 `POST`
 
    headers:
        Content-Type:  application/json | application/xml
        
    body:
        {
           "my-sample-data" : 123
        }
    
    RESPONSE:
        status: 200
        {
            id: "f4b06db1-1f3f-4458-9eb8-ec19019d0e6c"
        }


  `PATCH`
  
      headers:
          Content-Type:  application/json | application/xml
          
      body:
          {
             "id" : "f4b06db1-1f3f-4458-9eb8-ec19019d0e6c"
          }
      
      RESPONSE:
          status: 200
          ok


  `DELETE`
  
      headers:
          Content-Type:  application/json | application/xml
          
      body:
          {
             "id" : "f4b06db1-1f3f-4458-9eb8-ec19019d0e6c"
          }
      
      RESPONSE:
          status: 200
          ok
