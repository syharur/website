import bcrypt from 'bcryptjs';
const data={
    users:[
        {
            nama:'rul',
            email:'rul@yahoo.com',
            password:bcrypt.hashSync('123',8),
            isAdmin:true,
        },
        {
            nama:'iwan',
            email:'iwan@yahoo.com',
            password:bcrypt.hashSync('123',8),
            isAdmin:false,
        }
    ],
    pay:[
        {
            noId:'1',
            nama:'rul',
            responMidtrans:'good'
        }
        
    ],
    products:[
        {
            nama:'Fortuner1',
            category:'Car',
            image:'/image/fortuner.jpg',
            price:30001,
            brand:'toyota',
            rating:4.5,
            numReviews:10,
            description:'sport car',
            countInStock:3
        },
        {
            nama:'Fortuner2',
            category:'Car',
            image:'/image/fortuner.jpg',
            price:30002,
            brand:'toyota',
            rating:4.5,
            numReviews:10,
            description:'sport car',
            countInStock:10
        },
        {
            nama:'Harrier',
            category:'Car',
            image:'/image/New-Harrier-Specs.jpg',
            price:30003,
            brand:'toyota',
            rating:4.5,
            numReviews:10,
            description:'sport car',
            countInStock:3
        },
        {
            nama:'Fortuner3',
            category:'Car',
            image:'/image/fortuner.jpg',
            price:30004,
            brand:'toyota',
            rating:4.5,
            numReviews:12,
            description:'sport car',
            countInStock:0
        },
        {
            nama:'Fortuner4',
            category:'Car',
            image:'/image/fortuner.jpg',
            price:30005,
            brand:'toyota',
            rating:4.5,
            numReviews:10,
            description:'sport car',
            countInStock:1
        },
        {
            nama:'Fortuner5',
            category:'Car',
            image:'/image/fortuner.jpg',
            price:30006,
            brand:'toyota',
            rating:4.5,
            numReviews:10,
            description:'sport car',
            countInStock:0
        },
    
    ]
};
export default data;