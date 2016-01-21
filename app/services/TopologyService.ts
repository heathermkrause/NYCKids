let data = require('json!../../data/nycd.topo.json');

export class TopologyService{
    /**
     * Returns topology data for creating map
     * @returns {*}
     */
    public static getData(){
        return data;
    }
}