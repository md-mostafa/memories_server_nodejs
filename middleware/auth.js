import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
     try {
        const token = req.headers.authorization.split(" ")[1]; //this is to check if a user wants to like delete then if he is the one or nt
        const isCustomAuth = token.length < 500; //it is our own

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else {
            decodedData = jwt.decode(token);

            req.useId = decodedData?.sub;   //  ?. is called optional chaining
        }

        next();
     } catch(error) {
         console.log
     }
}

export default auth;

//a user wants to like a post
//click the like button =>first we go to auth middleware () confirms or denies the request if auth middleware(next) only then like controller...
//this is why middle ware is for any kind of action that happend before somethin