let data = require('json!../../data/nycd.statistic.json');

let dataArray = null;

export class StatisticService{

    /**
     * Returns statistic data as map from boroCD to all information
     * @returns {*}
     */
    public static getData(){
        return data;
    }

    /**
     * Returns statistic as an array of objects
     */
    public static getDataAsArray(){
        if(dataArray == null){
            dataArray = [];

            for(let p in data){
                dataArray.push(data[p]);
            }
        }

        return dataArray;
    }
}