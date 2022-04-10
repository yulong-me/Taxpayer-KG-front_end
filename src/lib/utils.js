function coverData(t_data, isSim, enjoy_name) {

    let t_initData = {
        nodes: [],
        edges: []
    }
    let total_enjoy = ''

    if (isSim) {
        let enjoy = new Set()

        for (const key in t_data) {
            t_data[key]

            const i_standard_data = t_data[key]
            for (let k = 0; k < i_standard_data.length; k++) {
                enjoy.add(i_standard_data[k].data.enjoy)
            }
        }
        for (let item of enjoy) {
            total_enjoy += item + '\n'
        }
    } else {
        total_enjoy = enjoy_name
    }


// 初始化享受主体
    t_initData.nodes.push({
        id: 'enjoy',
        label: total_enjoy,
        type_m: 'enjoy_',

    })


    let j = 0;
    var key2index = {}
    for (const key in t_data) {
        key2index[key] = j
        t_initData.nodes.push({
            id: 'tax-' + j,
            type_m: 'tax_',
            isLeaf: true,
            label: key,
        })
        t_initData.edges.push({
            source: "enjoy",
            target: 'tax-' + j,
        })
        j++
    }


    let i = 0


    for (const key in t_data) {
        j = key2index[key]

        const i_standard_data = t_data[key]
        for (let k = 0; k < i_standard_data.length; k++) {

            t_initData.nodes.push({
                id: 'item-' + i,
                type_m: 'item_',
                isLeaf: true,
                data: i_standard_data[k].data
            })
            t_initData.edges.push({
                source: "tax-" + j,
                target: 'item-' + i,

            })
            i += 1
        }
    }

    return t_initData

}


function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}


export default {
    coverData,
    randomNum
}


