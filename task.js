import React, { Component } from 'react';
import './task.css'
class Project extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            newList:"",
            lists:[
              {name:"todo",inputValue:""},
              {name:"doing",inputValue:""},
              {name:"done",inputValue:""}
            ],
            tasks:[
              {name:"authentification" , list:"todo",members:[{name:"hama",src:"https://tbsila.cdn.turner.com/toonla/images/cnemea/show/picker/item/apple-%26-onion/uk/cn_en_appleandonion_showpage_desktop_banner_showpicker_96x100.png"},{name:"salah",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg/239px-Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg"},{name:"slim",src:"https://tbsila.cdn.turner.com/toonla/images/cnemea/show/picker/item/%D9%81%D8%AA%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D9%82%D9%88%D8%A9/ab/ppg-show-picker-ppg.png"}]},
              {name:"ice ice baby" , list:"done",members:[]},
              {name:"hello " , list:"doing",members:[]},
              {name:"its me " , list:"doing",members:[]},
              {name:"first time no worm up" , list:"doing",members:[]},
              {name:"thing" , list:"todo",members:[]},
              {name:"ading" , list:"done",members:[]}
            ],
            team:[
              {name:"hama",src:"https://tbsila.cdn.turner.com/toonla/images/cnemea/show/picker/item/apple-%26-onion/uk/cn_en_appleandonion_showpage_desktop_banner_showpicker_96x100.png"},
              {name:"salah",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg/239px-Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg"},
              {name:"slim",src:"https://tbsila.cdn.turner.com/toonla/images/cnemea/show/picker/item/%D9%81%D8%AA%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D9%82%D9%88%D8%A9/ab/ppg-show-picker-ppg.png"}
            ]
          }
    }
    onChangeListValue=(e,listName)=>{
        let newLists=this.state.lists.map(el=>{if(el.name===listName) return {name:el.name,inputValue:e.target.value}; else return el})
        this.setState({lists:newLists})
        this.shouldComponentUpdate=(nextProps,nextState)=>{return false }
    }
    addTask=(listIndex)=>{
        let tab=this.state.tasks
        tab.push({name : this.state.lists[listIndex].inputValue, list:this.state.lists[listIndex].name,members:[]})
        this.setState({tasks:tab})
        this.shouldComponentUpdate=(nextProps,nextState)=>{return true }
    }
    addList=()=>{
        let newLists=this.state.lists
        newLists.push({name:this.state.newList,inputValue:""})
        this.setState({lists:newLists})
        this.shouldComponentUpdate=(nextProps,nextState)=>{return true } 
    }
    onDragStart=(ev,index,oldTask)=>{
        if(ev.target.className==="taskName")
        {
            ev.dataTransfer.setData("taskIndex",index);
        }
        else if (ev.target.className==="memberPicture")
        {
            ev.dataTransfer.setData("pictureIndex",index);
            ev.dataTransfer.setData("oldTask",oldTask);
        }
    }
    onDragOver = (ev) => {
        ev.preventDefault();
    }
    onDrop=(e,index,number)=>{
        let taskIndex=e.dataTransfer.getData("taskIndex")
        let pictureIndex=e.dataTransfer.getData("pictureIndex")
        let oldTask=e.dataTransfer.getData("oldTask")
        if(taskIndex!=="")
        {
            let tab =this.state.tasks
            tab[taskIndex].list=this.state.lists[index].name
            this.setState({tasks:tab})
        }
        else if (e.target.className==="taskMembers" && number==10)
        {
            let tab =this.state.tasks
            tab[index].members.push(tab[oldTask].members[pictureIndex])
            tab[oldTask].members=tab[oldTask].members.filter((el,i)=>i!=pictureIndex)
            this.setState({tasks:tab})
        }
    }
    render(){
        const Task=(props)=>{
            return(
                <div className="task" key={props.indexKey}>
                    <div className="taskName" draggable onDragStart={(e)=>this.onDragStart(e,props.indexKey)} >
                        <h3>{props.name}</h3>
                    </div>
                    <div className="taskMembers" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, props.indexKey,10)}}>
                        {props.members.map((el,i)=><img draggable onDragStart={(e)=>this.onDragStart(e,i,props.indexKey)} className="memberPicture" src={el.src} alt={el.name}/>)}
                    </div>
                </div>
            )
        }
        const List=(props)=>{
            return(
                <div className="List" key={props.indexKey} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, props.indexKey,9)}}>
                    <div className="listHead">
                        <h2>{props.name}</h2>
                    </div>
                    <div className="listBody">
                        {this.state.tasks.map((el,i)=>{if(el.list===props.name) {return <Task name={el.name} members={el.members} indexKey={i}/>}})}
                    </div>
                    <div>
                        <input type="text" onChange={(e)=>{this.onChangeListValue(e,props.name)}}/>
                        <input type="button" value="add task" onClick={()=>{this.addTask(props.indexKey)}}/>
                    </div>
                </div>
            )
        }
        
        return(
            <div className="project">
                <div className="addNewList">
                    <input type="text" onChange={(e)=>{this.setState({newList:e.target.value})}}/>
                    <input type="button" value="add new list" onClick={()=>{this.addList()}}/>
                </div>
                <div className="Lists">
                    {this.state.lists.map((el,i)=> {return <List indexKey={i} name={el.name}/>})}
                </div>
            </div>
        )
    }
}
export default Project;