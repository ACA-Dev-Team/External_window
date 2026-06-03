//import api from 'api';
import api from "./api";

export default {
  upload_doc_from_web(data) {
    return api.post(`api/external/messages/Uplode`, data);
  },

    upload_doc_from_sig(data) {
    return api.post(`/api/Mail/UplodeSignture`, data);
  },
  

  show_doc_for_order(id) {
    return api.get(`/api/Resources/GetSingleImage?id=${id}`,{});
    //   return api.post(`http://mail:82/api/Documents/AddDocuments`, newDocuments)
  },


     GetSpecificPageAsImage(filePath,pageNumber) {
    return api.get(`/api/Resources/GetSpecificPageAsImage?filePath=${filePath}&&pageNumber=${pageNumber}`,{responseType: 'blob'});
    //   return api.post(`http://mail:82/api/Documents/AddDocuments`, newDocuments)
  },



  save_new_order(list) {
    return api.put(`/api/Resources/update_mail_Resources_order`, list);
    //   return api.post(`http://mail:82/api/Documents/AddDocuments`, newDocuments)
  },

  get_ordering_image(mail_id) {
    return api.get(
      `/api/Resources/Get_Mail_Resourcescs_orders?mail_id=${mail_id}`
    );
  },
  GetAllDocN(mail_id, page_number, department_id) {
    return api.get(
      `/api/external/messages/GetAllDoc?mail_id=${mail_id}&page_number=${page_number}&department_id=${department_id}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetAllDoc?mail_id=${mail_id}&page_number=${page_number}`);
  },

  GetAllDocN_sec(mail_id, page_number, department_id) {
    return api.get(
      `/api/Resources/GetAllDocSection?mail_id=${mail_id}&page_number=${page_number}&department_id=${department_id}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetAllDoc?mail_id=${mail_id}&page_number=${page_number}`);
  },

  GetResources_ById(id, page_number) {
    return api.get(
      `/api/Reply/GetResources_ById?id=${id}&page_number=${page_number}`
    );
    //  return api.get(`http://mail:82/api/Reply/GetResources_ById?id=${id}&page_number=${page_number}`);
  },

  GetResources_ById2(id) {
    return api.get(`/api/external/messages/GetResources_ById2?id=${id}`);
    //  return api.get(`http://mail:82/api/Reply/GetResources_ById?id=${id}&page_number=${page_number}`);
  },

  GetResources_ById_Resend(id) {
    return api.get(`/api/Reply/GetResources_ById_Resend?id=${id}`);
    //  return api.get(`http://mail:82/api/Reply/GetResources_ById?id=${id}&page_number=${page_number}`);
  },

  
  GetResources_ById_Resend2(id) {
    return api.get(`/api/Reply/GetResources_ById_Resend2?id=${id}`);
    //  return api.get(`http://mail:82/api/Reply/GetResources_ById?id=${id}&page_number=${page_number}`);
  },



  AddDocument(newDocuments) {
    return api.post(`/api/Documents/AddDocuments`, newDocuments);
    //   return api.post(`http://mail:82/api/Documents/AddDocuments`, newDocuments)
  },

  GetDocmentForMail(mailId, marginalized) {
    return api.get(`/api/Documents/GetDocments/`, {
      //   return api.get(`http://mail:82/api/Documents/GetDocments/`, {
      params: {
        mailId: mailId,
        marginalized: marginalized,
      },
    });
  },

  DeleteDocument(documentId) {
    return api.delete(`/api/external/messages/DeleteDocument/`, {
      //   return api.delete(`http://mail:82/api/Documents/DeleteDocument/`, {
      params: {
        documentId: documentId,
      },
    });
  },
};
