/**
 * 目前的微服务名称以及对应信息
*/
const services = {
    'judge_plans':{
        port:3029,
        apiName:'judgePlan'
    },

    //员工okr
    'employee_okrs':{
        port:3023,
        apiName:'employeeOkr'
    },

    //部门okr
    'department_okrs':{
        port:3025,
        apiName:'departmentOkr'
    },
    
    //员工评价
    'employee_judgements':{
        port:3021,
        apiName:'employeeJudge'
    },

    //部门评价
    'department_judgements':{
        port:3022,
        apiName:'departmentJudge'
    },

    //周期服务
    'periods':{
        port:3014,
        apiName:'period'
    },

    //附件服务
    'attachments':{
        port:3028,
        apiName:'attachments'
    },

    //uac
    'uac_bonus':{
        port:3024,
        apiName:'uac'
    },

    //薪人薪事访问
    'xrxs-service':{
        port:3016,
        apiName:'xrxs'
    },

    //基础员工信息服务
    'employee-basic-service-bonus':{
        port:3027,
        apiName:'basicEmployees'
    },

    //基础部门信息服务
    'department-basic-service-bonus':{
        port:3026,
        apiName:'basicDepartments'
    }
}

const API = {} ;

for (let [serviceName, { port, apiName }] of Object.entries(services)) {
    API[apiName] = `${serviceName}:${port}`
}

module.exports = {
    API, //服务名和端口
    services //所有服务的信息
}