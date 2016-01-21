var csv = require('csv'),
    fs = require('fs');

var SOURCE_CSV_FILE = 'data/source/statistic/statistic.csv';
var TARGET_JSON_FILE = 'data/nycd.statistic.json';

var COLUMNS_HASH = [
    'geography', // 0
    'strength', // 1
    'weakness', // 2
    'borocd', // 3
    'gini', // 4
    'giniChange', // 5
    'medianIncome', // 6
    'medianIncomeChange', // 7
    'preschoolEnrollment', // 8
    'schoolEnrollment', // 9
    'neet', // 10
    'percentHHWithKids', // 11
    'percentHHWithNonRelatedResidentKids', // 12
    'mealGaps', // 13
    'homelessKidsPer1000', // 14
    'homelessKidsCount', // 15
    'infantMortality', // 16
    'childAsthmaHospitalizations', // 17
    'homelessFunding', // 18
    'percentChildAbuseCasesInvestigated', // 19
    'kidsIndex', // 20
    'indexEstimates', // 21
    'communityPerformance' // 22
];

var ID_INDEX = COLUMNS_HASH.indexOf('borocd');

/**
 * Parses line into JS object with prop => value mapping, based on column names
 * @param line
 */
function parseLine(line){
    var d = {};
    line.forEach(function(value, index){
        d[COLUMNS_HASH[index]] = value;
    });

    return d;
}


fs.readFile(SOURCE_CSV_FILE, 'utf8', function (err, data) {
    csv.parse(data, function (err, d) {
        var statData = {};

        d.forEach(function (line, index) {
            if(!index){
                return;
            }

            statData[line[ID_INDEX]] = parseLine(line);
        });

        fs.writeFile(TARGET_JSON_FILE, JSON.stringify(statData));
    });
});