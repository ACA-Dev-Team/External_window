//import axios from 'axios';
import api from './api';
export default {

    AddProcessingResponses(repliesInfo) {
        return api.post(`/api/Replies/AddReply`, repliesInfo)
      //  return api.post(`http://mail:82/api/Replies/AddReply`, repliesInfo)
    },

    GetProcessingResponses() {
        return api.get(`/api/Replies/GetReplies`)
      //  return api.get(`http://mail:82/api/Replies/GetReplies`)
    },

    DeleteResponsesService(id) {
        return api.delete(`/api/Replies/DeleteReply?replyId=${id}`);
     //   return api.delete(`http://mail:82/api/Replies/DeleteReply?replyId=${id}`);
    },

}