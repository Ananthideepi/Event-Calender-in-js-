const holidays=[{"hdate":"01-01-2023","title":"New Year Day"},
{"hdate":"15-01-2023","title":"Pongal"},
{"hdate":"16-01-2023","title":"Thiruvalluvar Day"},
{"hdate":"17-01-2023","title":"Uzhavar Thirunal"},
{"hdate":"26-01-2023","title":"Republic Day"},
{"hdate":"05-02-2023","title":"Thai Poosam"},
{"hdate":"22-03-2023","title":"Telugu New Year Day"},
{"hdate":"01-04-2023","title":"Annual closing of Accounts for Commercial Banks and Co-operative Banks"},
{"hdate":"04-04-2023","title":"Mahaveer Jayanthi"},
{"hdate":"07-04-2023","title":"Good Friday"},
{"hdate":"14-04-2023","title":"Tamil New Years Day and Dr.B.R.Ambedkars "},
{"hdate":"22-04-2023","title":"Ramzan (Idul Fitr)"},
{"hdate":"01-05-2023","title":"May Day"},
{"hdate":"29-06-2023","title":"Bakrid(Idul Azha)"},
{"hdate":"29-07-2023","title":"Muharram"},
{"hdate":"15-08-2023","title":"Independence Day"},
{"hdate":"06-09-2023","title":"Krishna Jayanthi"},
{"hdate":"17-09-2023","title":"Vinayakar Chathurthi"},
{"hdate":"28-09-2023","title":"Milad-un-Nabi"},
{"hdate":"02-10-2023","title":"Gandhi Jayanthi"},
{"hdate":"23-10-2023","title":"Ayutha Pooja"},
{"hdate":"24-10-2023","title":"Vijaya Dasami"},
{"hdate":"12-11-2023","title":"Deepavali"},
{"hdate":"25-12-2023","title":"Christmas"}
]
const calender= document.getElementById("calender") ;
const months= document.getElementById("month");
const weekday=document.getElementById("weekday");
var change_date=0;
var boxclick=null;
var events=localStorage.getItem("events")?JSON.parse(localStorage.getItem("events")):[];
button();
display();
function display(){

    const months= document.getElementById("month");
    const today=new Date();

// ...............data changed previou s or next month......................................................
    if(change_date !=0){
        today.setMonth(new Date().getMonth() + change_date);
        console.log("today",today)
    }
//................................... ...........................................................
    const date=today.getDate();
    const month=today.getMonth();
    const year=today.getFullYear();

//   console.log(month); 
//................................. get a local date in string.......(method)..........................................
        months.innerHTML= `${today.toLocaleDateString(
            "en-us",{
                month:"long",
               // year:"numeric" or ${year}
            })} ${year}`;
            // const calender= document.getElementById("calender") ;
            calender.innerHTML=" ";
// .............................find a last date in month(how many day in month)....................
                             // year, month, date
    const dayinmonth=new Date(year, month+1, 0).getDate();
    //  console.log(dayinmonth);
    // .....................first day in month.....................................
    const firstdaymonth=new Date(year, month ,1);
    // console.log(firstdaymonth);

    const weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const start_day= firstdaymonth.toLocaleDateString("en-us",{
    weekday:"long",
    month:"long",
    year:"numeric",
    day:"numeric"
    });
  
    //  console.log("start_day",start_day);
    //  console.log("start_day",start_day.split(","));
    //  console.log("start_day",start_day.split(",")[0]);
    const date_start=start_day.split(",")[0];
    // const today=start_day.split(",")[0];
    // .......................find empty box.....................................
    const empty_box=weekdays.indexOf(date_start);
    // console.log("empty_box",empty_box)
    // const empty_box=weekdays.indexOf("Saturday");
// ............date box display inner html.............................................
for(let i=1; i<=dayinmonth + empty_box; i++){
      
        const day_box=document.createElement("div");
                      day_box.classList.add("day");
                    //   day_box.classList.add("plain");
                     // .........digit..start with zero..................................................................
                     const monthVal=(month+1)<10?"0"+(month+1 ):(month+1)
                     const dateval=(i-empty_box)<10?"0"+(i-empty_box):(i-empty_box)
                     // ....................date format...................................................................       
                     const datetext=`${dateval}-${monthVal}-${year}`;
                     // console.log("datetext",datetext);
        if(i > empty_box){
            day_box.innerText=i-empty_box;
                        //   console.log("daybox",day_box)
 
                   
                    // ......................eventholiday ..................................
                    var eventofday=events.find((event)=> event.date===datetext);
                    var eventofholiday=holidays.find((event)=> event.hdate===datetext);
                    //  console.log("evet of the day",eventofday)
                    //  ..........................current date............................................
                        if(i-empty_box===date && change_date==0){
                                day_box.id="currentDate";
                        }
                        if(eventofday){
                        const dayevent=document.createElement("div");
                            dayevent.classList.add("event");
                            dayevent.innerText=eventofday.title;
                            day_box.append(dayevent);

                        }
                        if(eventofholiday){
                            const dayevent=document.createElement("div");
                                dayevent.classList.add("event");
                                dayevent.classList.add("holiday");
                                dayevent.innerText=eventofholiday.title;
                                day_box.append(dayevent);
                
                        }
    }
        else{
            day_box.classList.add("plain");
        }
        // console.log("datetext",datetext);   
    day_box.addEventListener("click",()=>{
    showmodel(datetext);
    })

    calender.append(day_box);
    
}

}
// ..........................................prev button next button.............................................................
function button(){
const btn_pre=document.getElementById("btn-pre");
const btn_next=document.getElementById("btn-next");
        btn_pre.addEventListener("click",()=>{
            change_date--;
            display();
            // console.log("change_data",change_date);
        })
        btn_next.addEventListener("click",()=>{
            change_date++;
            display();
        })
}
// .....................................................................................................................
const model=document.getElementById("model");
const viewEvents=document.getElementById("viewEvents");
const addEvent=document.getElementById("addEvent");
const event_save=document.getElementById("event_save");
const view_text=document.getElementById("view_text");
// ........................show model......................................................
function showmodel(datetext){
            boxclick=datetext;
        //    console.log("datetext",datetext)
        var eventofday=events.find((event)=> event.date===datetext);
    
        if(eventofday){
            viewEvents.setAttribute("style","display:block");
            view_text.innerText=eventofday.title;
        }
        else{
            addEvent.setAttribute("style","display:block");
           
        }
        model.setAttribute("style","display:block");
} 
// ......................................button. ...............................................................
        const close=document.querySelectorAll(".event_close");
        close.forEach(element => {
        element.addEventListener("click",closed)
        });
        model.addEventListener("click",closed);
// ..................................close................................................................
        function closed(){
            viewEvents.setAttribute("style","display:none");
            addEvent.setAttribute("style","display:none");
            model.setAttribute("style","display:none");
            boxclick=null;
            display();
        }
// ..................................................save........................................................
           
const addevent_txt=document.getElementById("addevent-txt");
event_save.addEventListener("click",save);
function save(){ 
    
       if(addevent_txt.value){  
        addevent_txt.classList.remove("error");
                events.push({
                    date:boxclick,
                    title:addevent_txt.value.trim()
                });
                localStorage.setItem("events", JSON.stringify(events));
                closed();
       }
       else{
        addevent_txt.classList.add("error");
       }
}
//......................................................delete.......................................
        const event_delete=document.getElementById("event_delete");
        event_delete.addEventListener("click",deleted);
        function deleted(){
        console.log(boxclick)
        console.log(events)
        events=events.filter((event)=>event.date !== boxclick);
        localStorage.setItem("events", JSON.stringify(events));
        closed();
        }
