swal({
    title: "JavaScript Exercise",
    text:`A JavaScript Common Process AKA 'CRUD'`,
    icon:"info",
    button:{
        text:"Let's Go"
    }
    });
var WebsiteName=document.getElementById('WebsiteNameInput');
var WebsiteURL=document.getElementById('WebsiteURLInput');
var SearchedWebsite=document.getElementById('SearchField');
var SitesContainer=[];
var SiteIndex;
if(localStorage.getItem('WebSiteList')!=null){
    SitesContainer= JSON.parse(localStorage.getItem('WebSiteList'))
    DisplayWebSitesList(SitesContainer);
}
function AddWebsite() {
    var SiteNameRegex=/^[a-zA-Z0-9]{2,}/
    var SiteURLRegex=/^(http:\/\/|https:\/\/)(w+\.|W+\.)?[a-zA-z0-9]{2,}\.?[a-zA-Z0-9]{2,}?\.?(com|org|net|mil|int)/
    var SName=WebsiteName.value
    var SURL=WebsiteURL.value
    if (SiteNameRegex.test(SName)&&SiteURLRegex.test(SURL)==true) {
        var NewSite={
            SiteName:WebsiteName.value,
            SiteURL:WebsiteURL.value
        }
        SitesContainer.push(NewSite)
        localStorage.setItem('WebSiteList',JSON.stringify(SitesContainer))
        DisplayWebSitesList(SitesContainer)
        ClearForm()
        swal({
            title: "Done",
            text:`Awsome`,
            icon:"success",
            button:false
            });
    }
    else{
        swal({
            title: "SomeThing Went Wrong,Review The Below Instructions",
            text:`The Site Name Must Be 2 Characters At Least,
            The Site URL Must Be including The Protocol Type,Domain Name as well as Top Level Domain At Least`,
            icon:"error",
            button:{
                text:'Try Agin'
            }
            });
    }
}
function DisplayWebSitesList(SitesContainer) {
    var WebSitesTableInfo=``
    for (i=0; i< SitesContainer.length;++i ){
        WebSitesTableInfo+=`
        <tr>
            <td class="py-3">${i+1}</td>
            <td class="py-3">${SitesContainer[i].SiteName}</td>
            <td><a href=${SitesContainer[i].SiteURL} target="_blank" class="btn btn-outline-primary px-4" role="button" >Surf It</a></td>
            <td><button  onclick="DeleteWebSite(${i})" class="btn btn-outline-danger">Remove It</button></td>
        </tr>
        `
    }
    document.getElementById('TableInfo').innerHTML=WebSitesTableInfo
}
function ClearForm() {
    WebsiteName.value=''
    WebsiteURL.value=''
}
function DeleteWebSite(SiteIndex){
    SitesContainer.splice(SiteIndex,1);
    localStorage.setItem('WebSiteList',JSON.stringify(SitesContainer))
    DisplayWebSitesList(SitesContainer)
    swal({
        title: "Done",
        text:`WebSite Successfully Deleted`,
        icon:"success",
        button:false
        });
}
function SearchedWebsites(term) {
    var Searchcontainer=[];
    for(i=0;i<SitesContainer.length;++i){
        if (SitesContainer[i].SiteName.toLowerCase().includes(term.toLowerCase())==true) {
            Searchcontainer.push(SitesContainer[i])
        }
    }
    DisplayWebSitesList(Searchcontainer)
}
