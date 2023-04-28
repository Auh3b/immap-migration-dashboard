import cloud from 'd3-cloud'
import { useMemo, useState } from 'react'
import ReactEchart from 'echarts-for-react'
import { makeStyles } from '@material-ui/core'
import { UNICEF_COLORS } from 'theme'

const useStyles = makeStyles((theme)=>({
  root:{
    '& > text':{
      
    }
  }
}))

const width = 400
const height = 400

const margin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export default function IntroWordCloud({
  data: _data = []
}:{
  data: {name:string, value:number}[]
}) {
  const classes = useStyles()
  const [translate, setTranslate] = useState([0,0])

  const data = useMemo(()=>{
    if(_data.length> 0){
      let output: any[] = []
      const words = _data.map(({name: text, value: size})=> ({text, size}))
      const wCloud = cloud()
        .size([width - margin.left - margin.top, height - margin.right - margin.left])
        .words(words)
        .rotate(0)
        .padding(5)
        .font('Barlow')
        .fontSize(d => Math.sqrt(d.size) * 12)
        .on('word',(word:any)=>{
          output = [...output, word]
        })
        setTranslate(wCloud.size())
        wCloud.start()

      return output
    }

    return []
  }, [_data])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.top}, ${margin.left})`}>
        <g transform={`translate(${translate[0]/2}, ${translate[1]/2})`}>
          {data.length > 0 && 
            data.map(({x,y,text, size}, index)=>(
              <text key={text} fill={UNICEF_COLORS[index]} fontWeight={'bold'} textAnchor='middle' transform={`translate(${+x}, ${+y})`} fontSize={size}>
                {text}
              </text>
            ))
          }
        </g>
      </g>
    </svg>
  )
}
