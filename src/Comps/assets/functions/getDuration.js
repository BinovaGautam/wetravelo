import moment from 'moment'


const getDuration = (origin,destination) =>{
     let start = moment(origin)
     let end = moment(destination)
    let diff = new Date(end - start)
    // let duration = ('0'+diff.getUTCHours()).substr(diff.getUTCHours().length -1,2)+' h '+ ('0'+diff.getUTCMinutes()).substr(diff.getUTCMinutes().length -1,2)+' m'
    let duration = `${'0'+diff.getUTCHours() } h ${ diff.getUTCMinutes()} m `
    return duration;
}


export default getDuration;