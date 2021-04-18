import {$} from '@core/dom.js'

export function resizeHandler(event, $root) {
    return new Promise( resolve => {
        const $resizer = $(event.target)
        const type = $resizer.data.resize
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value
    
        $resizer.css({
            opacity: 1,
            [sideProp]: '-4000px'
        })
        
        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.clientX - coords.right
                value = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.clientY - coords.bottom
                value = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }
    
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'col') {
                $parent.css({width: value + 'px'})
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(cell => cell.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }
            resolve({
                value,
                id: type === 'col' ? $parent.data.col : null
            })
            $resizer.css({
                opacity: 0,
                right: 0,
                bottom: 0
            })
        }
    })
}