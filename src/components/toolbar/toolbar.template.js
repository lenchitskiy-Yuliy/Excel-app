function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `
    return `
    <div
        class="excel-toolbar__button ${button.active ? 'active' : ''}"
        ${meta}
    >
        <span class="material-icons" ${meta}>${button.icon}</span>
    </div>
    `
}

export function creatToolbar(state) {
    const buttons = [
        {
            icon: 'format_bold',
            active: state.fontWeight === 'bold',
            value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state.fontStyle === 'italic',
            value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underlined',
            active: state.textDecoration === 'underline',
            value: {textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline'}
        },
        {
            icon: 'format_align_left',
            active: state.textAlign === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state.textAlign === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state.textAlign === 'right',
            value: {textAlign: 'right'}
        },
    ]
    return buttons.map(toButton).join('')
}