export const metaDataConfig = [
    {
        fieldName: 'name',
        tagName: 'input',
        type: 'text',
        value: '',
        placeholder: 'Your Name',
        required: true,
        valid: false
    },
    {
        fieldName: 'street',
        tagName: 'input',
        type: 'text',
        value: '',
        placeholder: 'Street',
        required: true,       
        valid: false
    },
    {
        fieldName: 'zipCode',
        tagName: 'input',
        type: 'text',
        value: '',
        placeholder: 'ZIP Code',
        required: true,
        minLength: 5,
        maxLength: 5,       
        valid: false
    },
    {
        fieldName: 'country',
        tagName: 'input',
        type: 'text',
        value: '',
        placeholder: 'Country',
        required: true,       
        valid: false
    },
    {
        fieldName: 'email',
        tagName: 'input',
        type: 'text',
        value: '',
        placeholder: 'Your E-mail',
        required: true,       
        valid: false
    },
    {
        fieldName: 'deliveryMethod',
        tagName: 'select',
        value: '',
        options:[
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
        ]
    }    
];