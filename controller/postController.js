const axios = require('axios');


const postController = async (req, res) => {
    const { tag, sortBy, direction } = req.query;
    const sortArrays = new Set(['id', 'reads', 'likes', 'popularity']);
    const directionArrays = new Set(['desc', 'asc']);
    let tagArray = [];
    if (!tag) {
        res.status(400).json({
            "error": "Tags parameter is required"
        });
    }
    if ( sortBy && !sortArrays.has(sortBy)) {
        res.status(400).json({
            "error":  "sortBy parameter is invalid" 
        });
    }
    if ( direction && !directionArrays.has(direction)) {
        res.status(400).json({
            "error":  "direction parameter is invalid" 
        });
    }
     
    let postsArray;
    let postsError = [];
    let countPost = 0;
    // converting tag query parameter to array
    tagArray = tag.split(',');
    // mapping through the Array of query parameters
    tagArray.map(async (tag) => {
        //making api call to fetch posts
       try {
        let posts = await axios.get(`https://api.hatchways.io/assessment/blog/posts`, {
                    params: {
                        tag: tag,
                        sortBy: sortBy,
                        direction:direction
                    }
        });
         
          //combining all the posts fetched from each tag
           countPost++;
           if (posts && countPost > 1) {
              postsArray= posts.data.posts.concat(posts.data.posts);
               
           } else {
            postsArray= posts.data.posts;
           }
           if (countPost === tagArray.length) {
             
               res.status(200).json({posts:[  ...new Set(postsArray)] })
           }
       } catch (error) {
           postsError.push(error.message);
           countPost++;
           if (countPost === tagArray.length) {
            res.status(500).json(postsError)
           }
       }     
    });

}

const pingController = async() => {
    res.status(200).json({success:true})
}


module.exports = { postController,pingController };