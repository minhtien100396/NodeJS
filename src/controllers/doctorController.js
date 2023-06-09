import doctorService from '../services/doctorService'


let getTopDoctorHome = async (req,res) => {
    let limit = req.query.limit;
    if (!limit){
        limit = 10;
    } 
    try {
        //+limit -> chuyển từ string sang number 
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch(e) {
        console.log(e);
        return res.status(200).json ({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
} 