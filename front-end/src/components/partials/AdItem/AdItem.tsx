import { Link } from 'react-router-dom';
import { Item } from './styled';
import { PropsAdItem } from '../../../types';
import { DateFormat } from '../../../utils/DateUtils';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function AdItem(props: { data: PropsAdItem }) {
  let price = '';

  if (props.data.priceNegotiable) {
    price = 'Preço Negociável';
  } else {
    price = `R$ ${props.data.price}`;
  }

  return (
    <Item className='aditem'>
      <Link to={`/ad/${props.data.id}`}>
        <div className='itemImage'>
          <img src={props.data.image} alt='' />
        </div>
        <div className='itemData'>
          <div className='itemPrice'>{price}</div>
          <div className='itemName'>{props.data.title}</div>
          <div className='itemState'><LocationOnOutlinedIcon /> {props.data.state}</div>
          <div className='itemDate'>{DateFormat(props.data.dateCreated)}</div>
        </div>
      </Link>
    </Item>
  );
}
