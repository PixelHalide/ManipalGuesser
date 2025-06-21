import test from './assets/test.jpg'
import Map from './Map.tsx'

const Image = () => {
  return (
    <div>
        <img src={test} className='max-w-1/2 max-h-1/2'/>
    </div>
  )
}

export default Image
