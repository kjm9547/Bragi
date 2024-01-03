import axios from 'axios'
import {Platform} from 'react-native'
export const client = () =>{
    const serverPath =Platform.OS ==='android'?
     'http://10.0.2.2:8080':
     'http://localhost8080'
    const SIGNIN_POST = async (data:object)=>{
        try{
            const response = await axios.post(`${serverPath}/member/sign-in`, data);
            console.log(response.data)
           return response
        }   
        catch(error){
            
            console.log(error)
        }
    }

    const SIGNUP_POST = async(data:object)=>{
        try{
            const response = await axios.post(`${serverPath}/member/sign-up`,data)
            return response.data.status
        }catch(error){
            console.log(error)
            return false
        }
    }
   
    type post_profile_image_props ={
        data:object|any,
        token:string|any,
    }
    const POST_PROFILE_IMAGE = async({data,token}:post_profile_image_props)=>{
        console.log('post data =====aaaaaaaaaaaaaaaaaaaaaa==', data)
        const formData = new FormData();
       
        formData.append('file', {
          uri: data.path,
          name: data.name, // 파일 이름
          type: data.type, // 파일 타입
        });
        formData.append('account','test1234')
        //console.log('POST_PROFILE_IMAGE=======',data)
        try{
            await axios.post(`${serverPath}/image`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` // Bearer 스킴을 사용하여 토큰 전달
                  },
             
            }).then((res)=>{
                console.log(res)
            })
            
            
        }catch(error){
            console.log(error)
        }
    }
    const SPOTIFY_SEARCH_GET =async (data:string) =>{
       console.log('SPOTIFY')
        try{
            const res = await axios.get(`${serverPath}/spotify/search`,{
                params:{
                    keyword:data
                }
            })
            
            return res.data.data
        }
        catch(error){
            console.log(error)
            
        }

    }
    const GET_SPOTIFY_TOKEN = async () => {
        console.log('token')
        try{
            const res = await axios.get(`${serverPath}/spotify/get-token`)
            console.log('token', res.data)
            return res.data
        }
        catch(error){
            console.log(error)
            
        }

    }
    type trackProp = {
        token:any,
        trackName:string,
        artistName:string
    }
    const GET_SPOTIFY_TRACK = async ({token,artistName,trackName}:trackProp) => {
        const accessToken = token;
        const playlistId = 'iu';
        const query =`${trackName} artist:${artistName}`
        const url = `https://api.spotify.com/v1/search`;
        const res = await axios.get(url, {
            params:{
                q:query,
                type:'track',
                limit:1
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
          })
            
          
          return res.data.tracks.items
              
          
           
    }

    // 피드 작성 로직
    type writeFeedProps = {
        userToken:string,
        data:any
    }
    const POST_WRITE_FEED = async ({userToken,data}:writeFeedProps) => {
        console.log(data)
        try{
            const res = await axios.post(`${serverPath}/boards/write`,data,{
                headers: {
                    Authorization: `Bearer ${userToken}` // Bearer 스킴을 사용하여 토큰 전달
                  },
            })
            console.log('token', res.data)
        }
        catch(error){
            console.log(error)
        }

    }

    const GET_FEED_LIST = async(userToken:string) => {
        try{
            const res =await axios.get(`${serverPath}/boards/posts`,{
                headers: {
                    Authorization: `Bearer ${userToken}` // Bearer 스킴을 사용하여 토큰 전달
                  },
            })
            return res.data
        }
        catch(error){
            console.log(error)
           
        }
    }

    const PUT_FEED_LIKE = async (userToken:string,feedId:number) =>{
        console.log(typeof feedId)
        try{
            const res =await axios.put(`${serverPath}/api/likes/post/${feedId}`,{},{
                headers: {
                    Authorization: `Bearer ${userToken}` // Bearer 스킴을 사용하여 토큰 전달
                  },
            })
            
        }
        catch(error){
            console.log(error)
           
        } 
    }

    //댓글 관련 서비스
   
    const POST_WRITE_COMMENT = async (boardId:number,userToken:string,data:object) => {
        console.log(boardId)
        try{
            const res =await axios.post(`${serverPath}/comments/comment/${boardId}`,data,{
               
                headers: {
                    Authorization: `Bearer ${userToken}` // Bearer 스킴을 사용하여 토큰 전달
                  },
            })
            
        }
        catch(error){
            console.log(error)
           
        } 
    }

    //음원 업로드 서비스

    const POST_TRACKS = async (
        data:object|any,
        token:string,
        body:string,
        image:string,
        
        ) =>{
        const formData = new FormData();
        formData.append('title',image)
        formData.append('body',body)
        formData.append('file',{
            uri:data[0].uri,
            name:data[0].name,
            type:data[0].type,

        })
        console.log('????dasdas',data)
        try{
            await axios.post(`${serverPath}/tracks`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` // Bearer 스킴을 사용하여 토큰 전달
                  },
             
            }).then((res)=>{
                console.log('??')
                console.log(res.data)
            })
            
            
        }catch(error:any){
            if (error.response) {
                console.error('서버 응답 상태 코드:', error.response.status);
                console.error('응답 데이터:', error.response.data);
              } else if (error.request) {
                console.error('요청에 대한 응답이 없음:', error.request);
              } else {
                console.error('오류 발생:', error.message);
              }
              console.error('오류 상세 내용:', error); // 전체 오류 내용 출력
            
        }
    }
   
    const GET_TRACK = async(userToken:string) =>{
        try{
            const res =await axios.get(`${serverPath}/tracks/posts`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}` // Bearer 스킴을 사용하여 토큰 전달
                  },
            }
            )
             
               return res.data
            

         
       }catch(error){
           console.log(error)
       
       }
    }
    const GET_IMAGE = async (path:any) =>{
        try{
             await axios.get(`http://localhost8080/image/images/profielImages/`,path).
             then((res)=>{
                console.log(res)
             })

            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
    return{
        SIGNIN_POST,
        SIGNUP_POST,
        SPOTIFY_SEARCH_GET,
        GET_SPOTIFY_TOKEN,
        GET_SPOTIFY_TRACK,
        POST_PROFILE_IMAGE,
        POST_WRITE_FEED,
        GET_FEED_LIST,
        PUT_FEED_LIKE,
        POST_WRITE_COMMENT,
        POST_TRACKS,
        GET_IMAGE,
        GET_TRACK
    }

}