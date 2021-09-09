## * assignment  * 
## create express application with two modules (User && Blogs) 
## User has (name ,email,password ,age ,location)
## Blogs has (title ,content,createdBy)
## APIS CRUD Operation For User module 
## 1- CREATE New USER with Validation (using Joi) each filed not null and for age min age 20 and max age 60 and set error message  
## 2- UPDATE USER  validate  using Joi
## 3- DELETE USER && Soft DELETE   validate params using Joi
## 4- List All User  
## 5- get specific user with id   validate params using Joi
## 6- search about user in (name and email) => front-end write char or word and back  this user    validate params using Joi 
## 7 - get all user with age greate than 30   validate  using Joi
## 8 - get all user with age less than 30   validate  using Joi
## 9 - get all user with age less or equal than 30  validate params using Joi
## APIS CRUD Operation For Blogs module 
## 1- CREATE New Blog with Validation (JOI) each filed not null   c each blog connected to one user  (search on how to connect tow collection in mongodb 
## 2- UPDATE Blogs  validate params using Joi
## 3- DELETEAll Blogs 
## 5- get specific Blog with id  validate params using Joi
## 6- search about Blog in (title and content) => front-end write char or word and back- Blogs && Soft DELETE   validate  using Joi
## 4- List end  return  this Blog  
## 7- get blogs that created by specific user  validate params using Joi
## 8- get blogs that created today (using moment)
## 9- get blogs that created yesterday (using moment)