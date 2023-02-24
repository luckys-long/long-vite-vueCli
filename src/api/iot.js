
import request from '@/service/request';


  

  export async function getLogManagelist(data) {
    return request(
      {
        url: '/api1/log/page',
        method: 'GET',
        params: {
            ...data
          },
      }
    );
  }

  export async function batchDelLog(data) {
    return request(
      {
        url: '/api1//log/remove/batch',
        method: 'POST',
        data
      }
    );
  }
  
  export async function getLogUploadlist(data) {
    return request(
      {
        url: '/api2/api/v2/edge/input',
        method: 'GET',
        params: {
            ...data
          },
      }
    );
  }


  export async function getNodeList(data) {
    return request(
      {
        url: '/api4/nodeInfo/getList',
        method: 'GET',
        params: {
            ...data
          },
      }
    );
  }

  export async function saveNodeInfo(data) {
    return request(
      {
        url: '/api4/nodeInfo/saveInfo',
        method: 'POST',
        data
      }
    );
  }

  export async function getNodeInfo(data) {
    return request(
      {
        url: '/api4/nodeInfo/getTopologyRelation',
        method: 'GET',
        params: {
            ...data
          },
      }
    );
  }
  
  export async function delNode(data) {
    return request(
      {
        url: `/api4/nodeInfo/deleteInfo/${data.nodeName}`,
        method: 'DELETE',
      }
    );
  }
  

  export async function nodePing(data) {
    return request(
      {
        url: `/api4/nodeInfo/ping/${data.nodeIp}`,
        method: 'GET',
      }
    );
  }

  