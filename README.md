# ts-boilerplate
Simple CRUD route which can convert data from xml/json/raw to xml/json/raw



###API
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
