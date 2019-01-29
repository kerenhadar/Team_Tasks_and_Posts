import axios from 'axios';
import {connect} from 'react-redux';

var url='https://jsonplaceholder.typicode.com/'

var getData = (tb) =>
{
    return axios.get(url + tb)
}

var DAL = {
    getData
}

export default DAL;

