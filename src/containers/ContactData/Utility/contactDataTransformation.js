import _ from 'lodash';

export default function createContactDataObj(arr){
    let contactData = [];
    let deliveryMethod = [];
    let concated = [];
    let resultObject = {};
    

    deliveryMethod = arr.filter(item => item.tagName === 'select');
    contactData = arr.filter(item => item.tagName === 'input');
    
    contactData.map(item => concated.push(constructObjByTagName(item)));
    deliveryMethod.map(item => concated.push(constructObjByTagName(item)));

    resultObject = concated.reduce(function(acc, curr){
        let key = Object.keys(curr)[0];
        acc[key] = curr[key];
        return acc;
    }, {})

    
    return resultObject;
}

function constructObjByTagName(obj){
    if(obj.tagName === 'select'){
        return {
            [_.get(obj, 'fieldName')]:{
                elementType: obj.tagName,
                elementConfig:{
                    options: [
                        ...obj.options
                    ]
                },
                value: obj.value
            }
        }
    }else{
        return {
            [_.get(obj, 'fieldName')]:{
                elementType: obj.tagName,
                elementConfig:{
                    type: obj.type,
                    placeholder: obj.placeholder
                },
                value: obj.value
            }
        }        
    }    
}