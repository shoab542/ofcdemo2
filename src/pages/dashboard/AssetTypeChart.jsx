import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, Dropdown } from 'react-bootstrap';
import {  useEffect, useLayoutEffect } from "react";
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch, useSelector } from "react-redux";
// import { getAssetType } from "../../redux/actions";

const api = new APICore();


const AssetTypeChart = ({ isEdit }) => {
  const dispatch = useDispatch();
  // const asset_type = useSelector((state)=> state.AssetType.asset_types);
  
  useLayoutEffect(() => {
    
    am4core.addLicense("ch-custom-attribution");
    let chart = am4core.create("assetTypeChart", am4charts.PieChart);
    
    // api.get(`/api/asset_type_graph`,{})
    // .then(res=>{
    //     chart.data=res.data;
    // }) 
  
    chart.data = [
      {
        amount: 10,
        asset_type: "3 mbps"
      },
      {
        amount: 20,
        asset_type: "4 mbps"
      },
      {
        amount: 30,
        asset_type: "6 mbps"
      },
      {
        amount: 20,
        asset_type: "8 mbps"
      },
      {
        amount: 10,
        asset_type: "10 mbps"
      }
    ]
  chart.dataSource.url = "pie_chart_data.json";
  let pieSeries = chart.series.push(new am4charts.PieSeries());   
  pieSeries.dataFields.value = "amount";
  pieSeries.dataFields.category = "asset_type";
  chart.innerRadius = am4core.percent(40);
  pieSeries.slices.template.stroke = am4core.color("#4a2abb");
  pieSeries.slices.template.strokeWidth = 0;
  pieSeries.slices.template.strokeOpacity = 1;
  // pieSeries.labels.template.disabled = true;
  // pieSeries.ticks.template.disabled = true;
  chart.legend = new am4charts.Legend();
  let marker = chart.legend.markers.template.children.getIndex(0);
  marker.cornerRadius(12, 12, 12, 12);
  marker.strokeWidth = 0;
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;

  }, []);
  
  // useEffect(()=>{
  //   dispatch(getAssetType(0,1))
  // },[])

  return (
    <Card className={isEdit ? 'mb-0':'mb-3'}>
      <Card.Body>
          <Dropdown className="float-end" align="end">
              <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              
          </Dropdown>

          <h4 className="header-title mb-0">Service</h4>
          
          <div id="assetTypeChart" style={{ width: "100%", height: "350px" }}></div>
          
          {/* {!asset_type.length > 0 &&
          <p>No asset type available</p>} */}
         
      </Card.Body>
  </Card>
    
  )
}

export default AssetTypeChart