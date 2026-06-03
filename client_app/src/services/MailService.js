//import api from 'api';
//import axios from "axios";
import api from "./api";

export default {
  Edit_Mail_Done(departmetidint, User_id, mail_id, mail_is_done, memberid) {
    return api.post(
      `/api/MemberReply/Edit_Mail_Done?departmetid=${departmetidint}&User_id=${User_id}&mail_id=${mail_id}&mail_is_done=${mail_is_done}&memberid=${memberid}`
   ,{} );
  },

  get_res_for_reply(rep_id) {
    return api.get(`/api/MemberReply/reply/${rep_id}/images`);
  },

 
  

 Contarct_State(SendToId, State) {
    return api.put(`/api/Mail/Contarct_State?SendToId=${SendToId}&State=${State}`,{});
  },


  
     Signiture_State(SendToId, State,SendOrRecieve,mailId) {
    return api.put(`/api/Mail/Signiture_State?SendToId=${SendToId}&State=${State}&SendOrRecieve=${SendOrRecieve}&mailId=${mailId}`,{});
  },

  

  Add_MemberReply(model) {
    return api.post(`/api/MemberReply/Add_MemberReply`, model);
    //   return api.post(`http://mail:82/api/Reply/AddReplyWithPhoto`, ReplyViewModel)
  },

  GetRepliesBySend(sendNumber, memberid, dep) {
    return api.get(
      `/api/MemberReply/GetRepliesBySend?sendNumber=${sendNumber}&memberid=${memberid}&dep=${dep}`
    );
  },

  GetMilMembers(mailid, dep) {
    return api.get(
      `/api/MemberReply/GetMilMembers?mailid=${mailid}&dep=${dep}`
    );
  },

  ReplyReaded(mail_id, my_department_Id, dep_id, userId, type, sends_id) {
    return api.put(
      `/api/external/messages/ReplyReaded?mail_id=${mail_id}&my_department_Id=${my_department_Id}&dep_id=${dep_id}&userId=${userId}&type=${type}&SendToId=${sends_id}`,{}
    );
  },

  Update_members(member) {
    return api.post(`/api/Mail/Add_Update_memberMail`, member);
    //  return api.put(`http://mail:82/api/Mail/UpdateMail`, Mail)
  },

  Get_all_members(id) {
    return api.get(`/api/Administrator/Getmembers?Dep=${id}`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  get_mail_report(mid, dep) {
    return api.get(`/api/Mail/GetMailDetailReport?dep=${dep}&mailid=${mid}`);
  },

  GetReplies(sends_id) {
    return api.get(`/api/external/messages/GetRepliesList?SendsToId=${sends_id}`);
    //  return api.get(`http://mail:82/api/Reply/GetReplyById?department_id=${department}&mail_id=${mail}`);
  },

  delete_reply(id, userid) {
    return api.put(`/api/external/messages/DeleteReply?id=${id}&UserId=${userid}`,{});
  },

  cancel_sending_to_sector_side(id, userId) {
    return api.delete(`/api/Mail/delete_sector?id=${id}&userId=${userId}`);
    //  return api.delete(`http://mail:82/api/Mail/DeleteMangament?mail_id=${mailId}&departmentId=${department_id}&userId=${userId}`);
  },

  testsss(page_num) {
    return api.get(
      `/api/ExternalMails/GetMail?userid=5&mailNumType=0&mangment=1&date_from=2021-11-04&date_to=2023-01-07&Replay_Date=false&mailnum=&genral_incoming_num=&summary=&Department_filter=&TheSection=&Measure_filter=&Classfication=&mail_state=&page_num=${page_num}&page_size=5`
    );

    //  return api.get(`http://mail:82/api/Mail/GetMailById?id=${id}&type=${type}`);
  },

  GetMailById(id, type) {
    return api.get(`/api/external/messages/GetMailById?id=${id}&type=${type}`);
    //  return api.get(`http://mail:82/api/Mail/GetMailById?id=${id}&type=${type}`);
  },

  SaveMail(info) {
    return api.post(`api/external/messages/AddMail`, info);
    //  return api.post(`http://mail:82/api/Mail/AddMail`, info)
  },

  UpdateResendMail(Mail) {
    return api.put(`/api/Resend/UpdateResendMail`, Mail);
    //  return api.put(`http://mail:82/api/Mail/UpdateMail`, Mail)
  },

  Save_resend(info) {
    return api.post(`/api/Resend/ResendMail`, info);
    //  return api.post(`http://mail:82/api/Mail/AddMail`, info)
  },

  Send_resend(mailId, userId, department_id1) {
    return api.put(
      `/api/Resend/SendResendMail?mail_id=${mailId}&user_id=${userId}&department_id=${department_id1}`,{}
    );
    //  return api.put(`http://mail:82/api/Mail/Send?mailid=${mailId}&userId=${userId}`)
  },

  SendMail(mailId, userId) {
    return api.put(`/api/external/messages/Send?mailid=${mailId}&userId=${userId}`,{});
    //  return api.put(`http://mail:82/api/Mail/Send?mailid=${mailId}&userId=${userId}`)
  },

  DeleteMail(my_department_id, userId, mail_id) {
    return api.delete(
      `/api/Mail/Delete?department_id=${my_department_id}&userId=${userId}&mail_id=${mail_id}`
    );
    //  return api.delete(`http://mail:82/api/Mail/Delete?department_id=${my_department_id}&userId=${userId}&mail_id=${mail_id}`);
  },

  UpdateMail(Mail) {
    return api.put(`/api/external/messages/UpdateMail`, Mail);
    //  return api.put(`http://mail:82/api/Mail/UpdateMail`, Mail)
  },

  cancel_sending_to_department(mailId, department_id, userId) {
    return api.delete(
      `/api/Mail/DeleteMangament?mail_id=${mailId}&departmentId=${department_id}&userId=${userId}`
    );
    //  return api.delete(`http://mail:82/api/Mail/DeleteMangament?mail_id=${mailId}&departmentId=${department_id}&userId=${userId}`);
  },

  cancel_sending_to_department_resend(sends_id, section_id, userId) {
    return api.put(
      `/api/Resend/DeleteSections?sends_to_id=${sends_id}&section_note_id=${section_id}&userId=${userId}`,{}
    );
    //  return api.delete(`http://mail:82/api/Mail/DeleteMangament?mail_id=${mailId}&departmentId=${department_id}&userId=${userId}`);
  },

  cancel_member(member) {
    return api.put(`/api/Mail/Delete_memberMail`, member);
    //  return api.delete(`http://mail:82/api/Mail/DeleteMangament?mail_id=${mailId}&departmentId=${department_id}&userId=${userId}`);
  },

  inboxs_member(
    section_id,
    id,
    mailType,
    date_from,
    date_to,
    mail_id,
    general_incoming_number,
    summary,
    s_number,
    page_num,
    page_size
  ) {
    return api.get(
      `/api/ExternalMails/GetIncomingMemberMail?SectionNumber=${section_id}&userid=${id}&mailNumType=${mailType}&d1=${date_from}&d2=${date_to}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&entity_reference_number=${s_number}&pagenum=${page_num}&size=${page_size}`
    );
    //     &resend_mail=${redirection}               return api.get(`http://mail:82/api/ExternalMails/GetIncomingMail?userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&page_num=${page_num}&page_size=${page_size}`);
  },

  inboxs(
    member_id,
    id,
    mailType,
    mangment_id,
    date_from,
    date_to,
    by_date_of_reply,
    mail_id,
    general_incoming_number,
    summary,
    department_id,
    side_id,
    measure_id,
    classification_id,
    mail_case_id,
    s_number,
    redirection,
    done_mail,
    not_done,
    new_reply,
    MemberMailIsDone,
    sig_filter,
    contarct_state,
    page_num,
    page_size
  ) {
    return api.get(
      `/api/external/messages/GetIncomingMail?membermail=${member_id}&userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&entity_reference_number=${s_number}&resend_mail=${redirection}&done=${done_mail}&not_done=${not_done}&CheckNewReplay=${new_reply}&MemberMailIsDone=${MemberMailIsDone}&sig_state=${sig_filter}&contarct_state=${contarct_state}&page_num=${page_num}&page_size=${page_size}`
    );
    //     &resend_mail=${redirection}               return api.get(`http://mail:82/api/ExternalMails/GetIncomingMail?userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&page_num=${page_num}&page_size=${page_size}`);
  },

  NewReplay_inboxs(
    member_id,
    id,
    mailType,
    mangment_id,
    date_from,
    date_to,
    by_date_of_reply,
    mail_id,
    general_incoming_number,
    summary,
    department_id,
    side_id,
    measure_id,
    classification_id,
    mail_case_id,
    s_number,
    redirection,
    done_mail,
    not_done,
    page_num,
    page_size
  ) {
    return api.get(
      `/api/ExternalMails/NewReplay?membermail=${member_id}&userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&entity_reference_number=${s_number}&resend_mail=${redirection}&done=${done_mail}&not_done=${not_done}&page_num=${page_num}&page_size=${page_size}`
    );
    //     &resend_mail=${redirection}               return api.get(`http://mail:82/api/ExternalMails/GetIncomingMail?userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&page_num=${page_num}&page_size=${page_size}`);
  },

  sent(
    id,
    mailType,
    mangment_id,
    date_from,
    date_to,
    by_date_of_reply,
    mail_id,
    general_incoming_number,
    summary,
    department_id,
    side_id,
    measure_id,
    classification_id,
    mail_case_id,
    s_number,
    certified,
    done_mails,
    not_done,
    sig_state,
    page_num,
    page_size
  ) {
    return api.get(
      `/api/external/messages/GetMail?userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&entity_reference_number=${s_number}&office_type=${certified}&done=${done_mails}&not_done=${not_done}&sig_state=${sig_state}&page_num=${page_num}&page_size=${page_size}`
    );
    //  return api.get(`http://mail:82/api/ExternalMails/GetMail?userid=${id}&mailNumType=${mailType}&mangment=${mangment_id}&date_from=${date_from}&date_to=${date_to}&Replay_Date=${by_date_of_reply}&mailnum=${mail_id}&genral_incoming_num=${general_incoming_number}&summary=${summary}&Department_filter=${department_id}&TheSection=${side_id}&Measure_filter=${measure_id}&Classfication=${classification_id}&mail_state=${mail_case_id}&page_num=${page_num}&page_size=${page_size}`);
  },

  read_it_mail(id, department_id, userId) {
    return api.put(
      `/api/external/messages/read_it_mail?mail_id=${id}&department_Id=${department_id}&userId=${userId}`,{}
    );
    //   return api.put(`http://mail:82/api/ExternalMails/read_it_mail?mail_id=${id}&department_Id=${department_id}&userId=${userId}`);
  },

  search(id, mailType, mangment_id, year) {
    return api.get(
      `/api/external/messages/search?id=${id}&type=${mailType}&year=${year}&department_Id=${mangment_id}`
    );
    //  return api.get(`http://mail:82/api/Mail/search?id=${id}&type=${mailType}&year=${year}&department_Id=${mangment_id}`);
  },

  GetSentMailById(id, type) {
    return api.get(`/api/external/messages/GetMailById?id=${id}&type=${type}&page_number=1`);
    //  return api.get(`http://mail:82/api/Mail/GetMailById?id=${id}&type=${type}&page_number=1`);
  },

  GetReplyByDepartment(department, mail) {
    return api.get(
      `/api/Reply/GetReplyById?department_id=${department}&mail_id=${mail}`
    );
    //  return api.get(`http://mail:82/api/Reply/GetReplyById?department_id=${department}&mail_id=${mail}`);
  },

  GetMailSubId(MailID, DepartmentId, UserId) {
    return api.get(
      `/api/Reply/GetMailSubId?MailID=${MailID}&DepartmentId=${DepartmentId}&UserId=${UserId}`
    );
    //  return api.get(`http://mail:82/api/Reply/GetReplyById?department_id=${department}&mail_id=${mail}`);
  },

  isExisiteGenaralInboxNumberFun(Genaral_inbox_Number) {
    return api.get(
      `/api/mail/is_exisite_genaral_inbox_number?Genaral_inbox_Number_id=${Genaral_inbox_Number}`
    );
  },

  show_senders2(id, department_id, resend_from) {
    return api.get(
      `/api/external/messages/GetDetaliesInIncomingMails?mail_id=${id}&department_id=${department_id}&resendfrom=${resend_from}`
    );
    //  return api.get(`http://mail:82/api/Mail/GetDetalies?mail_id=${id}`);
  },

  show_senders(id, my_dep) {
    return api.get(
      `/api/external/messages/GetDetalies?mail_id=${id}&department_id=${my_dep}`
    );
    //  return api.get(`http://mail:82/api/Mail/GetDetalies?mail_id=${id}`);
  },

  AllClassifications() {
    return api.get(`/api/Service/GetAllClassification`);
    //   return api.get(`http://mail:82/api/Service/GetAllClassification`);
  },

  AllMeasures() {
    return api.get(`/api/Service/GetAllMeasures`);
    //  return api.get(`http://mail:82/api/Service/GetAllMeasures`);
  },

  AllStateSent() {
    return api.get(`/api/external/messages/GetAllMailStateWithId?flag=1`);
    //  return api.get(`http://mail:82/api/Mail/GetAllMailStateWithId?flag=1`);
  },

  AllStateInbox() {
    return api.get(`/api/Mail/GetAllMailStateWithId?flag=2`);
    //  return api.get(`http://mail:82/api/Mail/GetAllMailStateWithId?flag=2`);
  },

  get_department_for_reply(departmentId, mydep, mailId, fromwhere) {
    return api.get(
      `/api/Department/DepatmentswhoCanResendReplyTo?departmentId=${departmentId}&mydep=${mydep}&mailId=${mailId}&fromwhere=${fromwhere}`
    );
  },

  get_department_for_reply2(departmentId, mailId) {
    return api.get(
      `/api/MemberReply/GetMemberDepartment?mydep=${departmentId}&mailId=${mailId}`
    );
  },

  AllDepartments() {
    return api.get(`/api/Department/GetAll`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

    GetAllBranches() {
    return api.get(`/api/Department/GetAllBranches`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  
  GetRelatedDepartments(mailId, departmentId) {
    return api.get(
      `/api/Department/GetRelatedDepartments?mailId=${mailId}&departmentId=${departmentId}`
    );
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  ResharedMailWithAnotherDep(Mail_id, depid, mydep, userid) {
    return api.post(
      `/api/Resend/ResharedMailWithAnotherDep?Mail_id=${Mail_id}&depid=${depid}&mydep=${mydep}&userid=${userid}`,{}
    );
  },

  AllDepartments_and_mysections(id) {
    return api.get(`/api/Department/GetAllDepartmentAndMysections?dep=${id}`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  AllDepartments_and_mysections22(dep_id, mai_id) {
    return api.get(
      `/api/Department/ResendToallDepartmentAndMysections?dep=${dep_id}&mailId=${mai_id}`
    );
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  get_department_and_sections(id) {
    return api.get(`/api/Department/GetDepartmentandSections?dep=${id}`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  only_tow_main_dep() {
    return api.get(`/api/Department/OnlyTwoMainDepartment`);
    //  return api.get(`http://mail:82/api/WeatherForecast/GetAllDepartments`);
  },

  AllSides() {
    return api.get(`/api/ExternalMails/Get_Extirnl_Sections`);
    //  return api.get(`http://mail:82/api/ExternalMails/Get_Extirnl_Sections`,);
  },

  GetInboxMailById(id, department, type, sends) {
    return api.get(
      `/api/external/messages/GetMailInfo?mail_id=${id}&Department_Id=${department}&type=${type}&sends=${sends}`
    );
    //  return api.get(`http://mail:82/api/WeatherForecast/GetMailInfo?mail_id=${id}&Department_Id=${department}&type=${type}`,);
  },

  GetInboxMailById2(id, department, type) {
    return api.get(
      `/api/external/messages/GetMailInfoWithResend?mail_id=${id}&Department_Id=${department}&type=${type}`
    );
    //  return api.get(`http://mail:82/api/WeatherForecast/GetMailInfo?mail_id=${id}&Department_Id=${department}&type=${type}`,);
  },

  GetAllDocuments(id, userId, department_id) {
    return api.get(
      `/api/external/messages/GetMailResources?mail_id=${id}&userId=${userId}&department_id=${department_id}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetMailResources?mail_id=${id}&userId=${userId}`,);
  },


    GetAllDocuments_signture(id, userId, mydep,b64) {
    return api.get(
      `/api/Resources/GetMailResourcesSignature?mail_id=${id}&userId=${userId}&mydep=${mydep}&b64=${b64}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetMailResources?mail_id=${id}&userId=${userId}`,);
  },



  GetAllDocuments_sec(id, userId, department_id) {
    return api.get(
      `/api/Resources/GetMailResourcesSection?mail_id=${id}&userId=${userId}&department_id=${department_id}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetMailResources?mail_id=${id}&userId=${userId}`,);
  },

  ResendReplayWithPhoto(ReplyViewModel1) {
    return api.post(`/api/Reply/ResendReplayWithPhoto`, ReplyViewModel1);
    //   return api.post(`http://mail:82/api/Reply/AddReplyWithPhoto`, ReplyViewModel)
  },

  NewAddReply(ReplyViewModel) {
    return api.post(`/api/external/messages/AddReplyWithPhoto`, ReplyViewModel);
    //   return api.post(`http://mail:82/api/Reply/AddReplyWithPhoto`, ReplyViewModel)
  },

  AddRecipients(Recipients) {
    return api.post(`/api/OraginalPaper/AddRecipients`, Recipients);
  },

  GetAllAddRecipients(mailid) {
    return api.get(`/api/OraginalPaper/GetAllAddRecipients?mailid=${mailid}`);
  },

  GetAllDepartmentRecipients(mailid) {
    return api.get(
      `/api/OraginalPaper/GetAllDepartmentRecipients?mailid=${mailid}`
    );
  },

  //***********27/2/2023
  update_replay(ReplyViewModel) {
    return api.post(`/api/Reply/update_replay`, ReplyViewModel);
  },
  //********end 27/2/2023

  // UploadImagesMail(id, list) {
  //      return api.post(`/api/Mail/Uplode`, { userId: 9, mail_id: Number(id), list: list, })
  //  return api.post(`http://mail:82/api/Mail/Uplode`, { userId: 9, mail_id: Number(id), list: list, })
  UploadImagesMail(id, list, userId) {
    return api.post(`/api/external/messages/Uplode`, {
      userId: userId,
      mail_id: Number(id),
      list: list,
    });
    // return api.post(`http://mail:82/api/Mail/Uplode`, { userId: userId, mail_id: Number(id), list: list, })
  },

  DeleteAllDocuments(id, userId, department_id) {
    return api.delete(
      `/api/external/messages/delete_all_image?id=${id}&userId=${userId}&departmentid=${department_id}`
    );
    //   return api.delete(`http://mail:82/api/Mail/DeleteDocument?id=${id}&userId=${userId}`)
  },

  GetMailResourcesAndAllReplys(id, userId, department_id, mydep) {
    return api.get(
      `/api/external/messages/GetMailResourcesAndAllReplys?mail_id=${id}&userId=${userId}&department_id=${department_id}&mydep=${mydep}`
    );
    //  return api.get(`http://mail:82/api/Resources/GetMailResources?mail_id=${id}&userId=${userId}`,);
  },

  MergeAndDownload(id, userId, department_id, mydep) {
    return api.get(
      `/api/external/messages/MergeAndDownload?mail_id=${id}&userId=${userId}&department_id=${department_id}&mydep=${mydep}`,
      { responseType: "blob" }
    );
    //  return api.get(`http://mail:82/api/Resources/GetMailResources?mail_id=${id}&userId=${userId}`,);
  },

  mail_done(dep_id, user_id, mail_id, mail_done) {
    return api.post(
      `/api/Reply/ReplayIsDone?departmetid=${dep_id}&User_id=${user_id}&mail_id=${mail_id}&mail_is_done=${mail_done}`,{}
    );
    //  return api.post(`http://mail:82/api/Resources/print?mail_id=${id}&userId=${userId}&type=${type}`,);
  },

  DeleteDocument(id, userId) {
    return api.delete(`/api/external/messages/DeleteDocument?id=${id}&userId=${userId}`);
    //   return api.delete(`http://mail:82/api/Mail/DeleteDocument?id=${id}&userId=${userId}`)
  },

  PrintOrShowDocument(id, userId, type) {
    return api.post(
      `/api/Resources/print?mail_id=${id}&userId=${userId}&type=${type}`,{}
    );
    //  return api.post(`http://mail:82/api/Resources/print?mail_id=${id}&userId=${userId}&type=${type}`,);
  },

  // hussain function

  UpdateArchive(model) {
    return api.put(`/api/Archive/Update`, model);
    //   return api.put(`http://mail:82/api/Archive/Update`, model)
  },

  printHistory(model) {
    return api.put(`/api/Archive/Updates`, model);
    //  return api.put(`http://mail:82/api/Archive/Updates`, model)
  },

  GetMailForArchives(
    page,
    pageSize,
    mail_number,
    date_time_of_day,
    date_time_from,
    department_id,
    side_id,
    mail_summary,
    MailType,
    Perent
  ) {
    return api.get(
      `/api/Archive/GetAll?page=${page}&pageSize=${pageSize}&mail_number=${mail_number}&date_time_of_day=${date_time_of_day}&date_time_from=${date_time_from}&department_id=${department_id}&side_id=${side_id}&mail_summary=${mail_summary}&MailType=${MailType}&Perent=${Perent}`
    );
    //  return api.get(`http://mail:82/api/Archive/GetAll?page=${page}&pageSize=${pageSize}&mail_number=${mail_number}&date_time_of_day=${date_time_of_day}&date_time_from=${date_time_from}&department_id=${department_id}&side_id=${side_id}&mail_summary=${mail_summary}&MailType=${MailType}&Perent=${Perent}`,);
  },

  Add_user(user) {
    return api.post(`/api/Administrator/Add`, user);
    //   return api.post(`http://mail:82/api/Administrator/Add`, user,);
  },

  GetAllRoles() {
    return api.get(`/api/Role/GetAll`);
    //   return api.get(`http://mail:82/api/Role/GetAll`,);
  },

  GetUsersOfBranchDepartment(id) {
    return api.get(`/api/Administrator/GetByDepartmentId?department=${id}`);
    //   return api.get(`http://mail:82/api/Administrator/GetByDepartmentId?department=${id}`,);
  },

  GetUsersOfDepartment(id) {
    return api.get(`/api/Administrator/GetByDepartmentId?department=${id}`);
    //   return api.get(`http://mail:82/api/Administrator/GetByDepartmentId?department=${id}`,);
  },

  GetUsersOfDepartmentControl(id) {
    return api.get(
      `/api/Administrator/GetByDepartmentIdControl?department=${id}`
    );
    //   return api.get(`http://mail:82/api/Administrator/GetByDepartmentIdControl?department=${id}`,);
  },

  StopPublicAdministrations(stop_PublicAdministrations) {
    return api.put(
      `/api/Department/change_state?StopActive=${stop_PublicAdministrations}`,{}
    );
    //  return api.put(`http://mail:82/api/Administrator/Delete/`, StopActive)
  },

  GetBranchOfDepartment(id) {
    return api.get(
      `/api/Administrator/GetBranchByDepartmentId?departmentid=${id}`
    );
  },

  GetAllDocuments2(id) {
    return api.get(`/api/Resources/GetAllRes?id=${id}`);
    //  return api.get(`http://mail:82/api/Resources/GetAllRes?id=${id}`,);
  },

  GetMails(filter, role) {
    return api.get(`/api/Mails/GetMails`, {
      //   return api.get(`http://mail:82/api/Mails/GetMails`, {
      params: {
        pageSize: filter.pageSize,
        pageNo: filter.pageNo,
        role: role,
      },
    });
  },

  BossSee(mailId) {
    return api.put(`/api/Mails/BossSee?mailId=${mailId}`,{});
    //  return api.put(`http://mail:82/api/Mails/BossSee?mailId=${mailId}`,);
  },

  EmploySee(mailId) {
    return api.put(`/api/Mails/EmploySee?mailId=${mailId}`,{});
    //   return api.put(`http://mail:82/api/Mails/EmploySee?mailId=${mailId}`,);
  },

  GetSearchList(searchTerm) {
    return api.get(`/api/Mails/GetSearchList`, {
      //    return api.get(`http://mail:82/api/Mails/GetSearchList`, {
      params: {
        searchTerm: searchTerm,
      },
    });
  },

  GetMysectionReport(department_Id, fromdate, todate, mailtype) {
    return api.get(
      `/api/Reports/GetMySectionReport?departmentid=${department_Id}&fromdate=${fromdate}&todate=${todate}&MailType=${mailtype}&SendedOrRecieved=${"sended"}`
    );
    //  return api.get(`http://mail:82/api/Reports/GetMySectionReport?departmentid=${department_Id}&fromdate=${fromdate}&todate=${todate}&MailType=${mailtype}&SendedOrRecieved=${"sended"}`,);
  },

  Get_sent_report_ayoub(
    department_Id,
    from,
    to,
    Department_filter,
    mailnum,
    summary,
    mail_type,
    Measure_filter,
    Classfication,
    mail_state,
    genral_incoming_num,
    side_selected,
    entity_ref_num,
    date_of_reply,
    mail_done,
    not_done
  ) {
    // return api.get(`/api/Reports/GetReportDepartment?departmenti_d=${department_Id}&from=${from}&to=${to}&Department_filter=${Department_filter}&mailnum=${mailnum}&summary=${summary}&mail_type=${mail_type}&Measure_filter=${Measure_filter}&Classfication=${Classfication}&mail_state=${mail_state}&genral_incoming_num=${genral_incoming_num}`,);
    return api.get(
      `/api/Reports/GetReportDepartment?departmenti_d=${department_Id}&from=${from}&to=${to}&Department_filter=${Department_filter}&mailnum=${mailnum}&summary=${summary}&mail_type=${mail_type}&Measure_filter=${Measure_filter}&Classfication=${Classfication}&mail_state=${mail_state}&genral_incoming_num=${genral_incoming_num}&thesection=${side_selected}&entity_reference_number=${entity_ref_num}&Replay_Date=${date_of_reply}&done=${mail_done}&not_done=${not_done}`
    );

    //  return api.get(`http://mail:82/api/Reports/GetReportDepartment?departmenti_d=${department_Id}&from=${from}&to=${to}`,);
  },

  GetReportDepartmentForArchive(
    department_Id,
    from,
    to,
    Department_filter,
    mailnum,
    summary,
    mail_type,
    Measure_filter,
    Classfication,
    mail_state,
    genral_incoming_num,
    side_selected,
    entity_ref_num,
    date_of_reply,
    mail_done,
    not_done
  ) {
    // return api.get(`/api/Reports/GetReportDepartment?departmenti_d=${department_Id}&from=${from}&to=${to}&Department_filter=${Department_filter}&mailnum=${mailnum}&summary=${summary}&mail_type=${mail_type}&Measure_filter=${Measure_filter}&Classfication=${Classfication}&mail_state=${mail_state}&genral_incoming_num=${genral_incoming_num}`,);
    return api.get(
      `/api/Reports/GetReportDepartmentForArchive?departmenti_d=${department_Id}&from=${from}&to=${to}&Department_filter=${Department_filter}&mailnum=${mailnum}&summary=${summary}&mail_type=${mail_type}&Measure_filter=${Measure_filter}&Classfication=${Classfication}&mail_state=${mail_state}&genral_incoming_num=${genral_incoming_num}&thesection=${side_selected}&entity_reference_number=${entity_ref_num}&Replay_Date=${date_of_reply}&done=${mail_done}&not_done=${not_done}`
    );

    //  return api.get(`http://mail:82/api/Reports/GetReportDepartment?departmenti_d=${department_Id}&from=${from}&to=${to}`,);
  },
};
