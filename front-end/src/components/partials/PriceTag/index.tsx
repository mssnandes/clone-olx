interface PriceTagProps {
  price: number;
}

const PriceTag: React.FC<PriceTagProps> = ({ price }) => (
  <svg width='500' height='50' xmlns='http://www.w3.org/2000/svg'>
    <defs>
        <clipPath id='clipPath'>
            <path
                d='
                M0,25
                L20,0
                H180
                Q190,0 190,10
                V40
                Q190,50 180,50
                H20
                L0,25
                Z'
            />
        </clipPath>
    </defs>
    <rect width='500' height='50' fill='#6a0dad' clipPath='url(#clipPath)' />
    <text
        x='15%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'
        fill='white'
        fontSize='20'
        fontFamily='Arial, sans-serif'
    >
      {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
    </text>
  </svg>
);

export default PriceTag;
