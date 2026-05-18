import React from 'react';
import { X, FileText } from 'lucide-react';

interface WorkOrder {
  id: string;
  name: string;
  source: string;
  urgency: string;
  assignee: string;
  status: string;
  time: string;
}

interface WorkOrderDetailModalProps {
  workOrder: WorkOrder;
  onClose: () => void;
  onDispatch?: () => void;
  onAccept?: () => void;
}

export default function WorkOrderDetailModal({ workOrder, onClose, onDispatch, onAccept }: WorkOrderDetailModalProps) {
  const StatusStyle: Record<string, string> = {
    '待派发': 'bg-[#c1bd3c]',
    '待处理': 'bg-[#a3a3a3]',
    '处理中': 'bg-[#4281ed]',
    '待验收': 'bg-[#eaa24a]',
    '已关闭': 'bg-[#7ab743]',
  };

  const UrgencyStyle: Record<string, string> = {
    '重要': 'bg-[#eaa24a]',
    '紧急': 'bg-[#cb3131]',
    '一般': 'bg-[#4281ed]',
  };

  const SourceStyle: Record<string, string> = {
    '人工报修': 'text-[#7ab743]',
    '巡检生成': 'text-[#eaa24a]',
    '系统告警': 'text-[#cb3131]',
  };

  // Mock data based on status
  let deviceType = '--';
  let location = '--';
  let reporter = '--';
  let phone = '--';
  let requiredTime = '';
  let description = '';
  let mockTimeline: any[] = [];
  let showAction = false;
  let actionText = '';
  let showFixRecord = false;
  let totalTime = '';

  if (workOrder.status === '待派发') {
    deviceType = '照明';
    location = '5号教学楼 / B栋201';
    reporter = '张三';
    phone = '18344749201';
    description = '5号教学楼B栋201的消防通道出口灯损坏，需要现场排查情况更换。';
    showAction = true;
    actionText = '派发';
    mockTimeline = [
      { time: '2025-07-22 16:  00', text: <>维修工单由 <span className="text-[#3b7fed]">林零</span> 创建</>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (workOrder.status === '待验收') {
    deviceType = '照明';
    location = '4号教学楼 / A栋405';
    reporter = '林零';
    phone = '13800138720';
    requiredTime = '2025-07-22 18: 10';
    description = '4号教学楼A栋405有一个筒灯不亮，需要检查维修。';
    showAction = true;
    actionText = '验收';
    showFixRecord = true;
    totalTime = '1小时20分钟';
    mockTimeline = [
      { time: '2025-07-22 16:  00', text: <>维修工单由 <span className="text-[#3b7fed]">林零</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  10', text: <>工单由 <span className="text-[#3b7fed]">王主管</span> 派发给 <span className="text-[#3b7fed]">李光</span></>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  20', text: <><span className="text-[#3b7fed]">李光</span> 处理工单</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 17:  40', text: <><span className="text-[#3b7fed]">李光</span> 完成工单</>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (workOrder.status === '待处理') {
    deviceType = '传感器';
    location = '图书馆 / 1层';
    reporter = '林零';
    phone = '13800138720';
    requiredTime = '2025-07-22 18: 10';
    description = '图书馆1层的1号水浸传感器越限告警，需要现场排查情况更换。';
    mockTimeline = [
      { time: '2025-07-22 16:  00', text: <>维修工单由 <span className="text-[#3b7fed]">林零</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  10', text: <>工单由 <span className="text-[#3b7fed]">王主管</span> 派发给 <span className="text-[#3b7fed]">李光</span></>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (workOrder.status === '处理中') {
    deviceType = '空调';
    location = '5号教学楼 / B栋203';
    reporter = '林零';
    phone = '13800138720';
    requiredTime = '2025-07-22 18: 10';
    description = '5号教学楼B栋203的空调不制冷，需要现场排查情况更换。';
    mockTimeline = [
      { time: '2025-07-22 16:  00', text: <>维修工单由 <span className="text-[#3b7fed]">林零</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  10', text: <>工单由 <span className="text-[#3b7fed]">王主管</span> 派发给 <span className="text-[#3b7fed]">李光</span></>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  20', text: <><span className="text-[#3b7fed]">李光</span> 处理工单</>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (workOrder.status === '已关闭') {
    deviceType = '--';
    location = '图书馆 / B1层';
    reporter = '林零';
    phone = '13800138720';
    requiredTime = '2025-07-22 18: 10';
    description = '4号教学楼A栋405有一个筒灯不亮，需要检查维修。';
    showFixRecord = true;
    totalTime = '1小时20分钟';
    mockTimeline = [
      { time: '2025-07-22 16:  00', text: <>维修工单由 <span className="text-[#3b7fed]">林零</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  10', text: <>工单由 <span className="text-[#3b7fed]">王主管</span> 派发给 <span className="text-[#3b7fed]">李光</span></>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 16:  20', text: <><span className="text-[#3b7fed]">李光</span> 处理工单</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 17:  40', text: <><span className="text-[#3b7fed]">李光</span> 完成工单</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 17:  40', text: '工单已验收关闭', dotColor: 'bg-[#7ab743]' }
    ];
  }

  const renderPhotoGrid = () => {
    return (
      <div className="flex space-x-4 mt-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-[124px] h-[82px] bg-[#e2e8f0] flex flex-col items-center justify-center relative overflow-hidden rounded-[3px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#94a3b8] mb-4 -ml-2"></div>
            <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[35px] border-b-[#4281ed] absolute bottom-0 -ml-14"></div>
            <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[50px] border-b-[#4281ed] absolute bottom-0 ml-12 opacity-90"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center pt-10">
      <div className="bg-white rounded-lg w-[850px] shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#f0f0f0]">
          <div className="flex items-center space-x-3">
             <h2 className="text-[18px] font-bold text-[#333]">工单详情</h2>
             <span className={`${StatusStyle[workOrder.status] || 'bg-gray-500'} text-white text-[12px] px-2 py-0.5 rounded-sm items-center justify-center font-medium shadow-sm`}>
               {workOrder.status}
             </span>
          </div>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-[#edf3fd] to-[#f6f9fe] rounded-t-lg p-5 flex flex-col space-y-4">
             <div className="flex justify-between items-start">
               <div className="flex flex-col space-y-2">
                 <div className="flex items-center space-x-3 h-[32px]">
                   <div className="w-[32px] h-[32px] bg-gradient-to-br from-blue-400 to-blue-500 rounded-[6px] flex items-center justify-center shadow-sm relative overflow-hidden shrink-0">
                       <div className="absolute inset-0 bg-white/20 transform -skew-x-[20deg] w-1/2 left-0"></div>
                       <FileText size={18} className="text-white relative z-10" />
                   </div>
                   <span className="text-[17px] font-bold text-[#333] tracking-wide">{workOrder.name}</span>
                 </div>
                 <div className="flex items-center space-x-3 ml-[44px]">
                    <span className={`${UrgencyStyle[workOrder.urgency] || 'bg-gray-500'} text-white text-[12px] px-2 py-0.5 rounded-sm items-center justify-center font-medium shadow-sm`}>
                      {workOrder.urgency}
                    </span>
                    <span className="border border-[#d1d5db] bg-white text-[#555] text-[13px] px-2.5 py-0.5 rounded-md font-medium shadow-sm">
                      {workOrder.id}
                    </span>
                 </div>
               </div>
               
               {showAction && (
                 <button 
                   onClick={() => {
                     if (actionText === '派发') onDispatch?.();
                     if (actionText === '验收') onAccept?.();
                   }}
                   className="bg-[#4281ed] text-white px-5 py-1.5 rounded-[4px] text-[14px] font-medium shadow-sm hover:bg-blue-600 cursor-pointer"
                 >
                   {actionText}
                 </button>
               )}
             </div>
             
             <div className="grid grid-cols-2 gap-y-4 gap-x-10 mt-2 px-2">
                 <div className="flex items-center">
                     <span className="w-[80px] text-[14px] text-[#555]">设备类型：</span>
                     <span className="text-[#333] text-[14px]">{deviceType}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[80px] text-[14px] text-[#555]">具体位置：</span>
                     <span className="text-[#333] text-[14px]">{location}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[80px] text-[14px] text-[#555]">工单来源：</span>
                     <span className={`text-[14px] ${SourceStyle[workOrder.source]}`}>{workOrder.source}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[80px] text-[14px] text-[#555]">报修人：</span>
                     <span className="text-[#333] text-[14px]">{reporter}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[80px] text-[14px] text-[#555]">报修电话：</span>
                     <span className="text-[#333] text-[14px]">{phone}</span>
                 </div>
                 {requiredTime && (
                 <div className="flex items-center">
                     <span className="w-[110px] text-[14px] text-[#555] shrink-0">要求完成时间：</span>
                     <span className="text-[#333] text-[14px]">{requiredTime}</span>
                 </div>
                 )}
             </div>
          </div>

          <div className="flex space-x-6 mt-6">
            <div className="flex-1 pr-6 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-[16px] font-bold text-[#333] mb-3">问题描述</h3>
                    <p className="text-[14px] text-[#333] leading-relaxed">
                        {description}
                    </p>
                </div>
                
                <div className="mb-6">
                    <h3 className="text-[16px] font-bold text-[#333] mb-1">故障图片</h3>
                    {renderPhotoGrid()}
                </div>

                {showFixRecord && (
                    <>
                        <div className="mb-6 mt-2">
                            <h3 className="text-[16px] font-bold text-[#333] mb-3">修复记录</h3>
                            <p className="text-[14px] text-[#333] leading-relaxed">
                                通过更换筒灯，目前该区域所有照明设备完好，问题已解决。
                            </p>
                        </div>
                        
                        <div className="mb-6 mt-2">
                            <h3 className="text-[16px] font-bold text-[#333] mb-1">现场照片</h3>
                            {renderPhotoGrid()}
                        </div>
                        
                        <div className="mt-4 mb-2 text-[14px] flex">
                            <span className="text-[#555]">维修总耗时：</span>
                            <span className="text-[#333]">{totalTime}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="w-[280px]">
               <div className="border border-[#f0f0f0] rounded-lg overflow-hidden shrink-0">
                 <div className="bg-[#f9fafc] px-4 py-3 border-b border-[#f0f0f0]">
                   <h3 className="text-[15px] font-bold text-[#333]">记录处理时间线</h3>
                 </div>
                 <div className="p-5 flex flex-col bg-white min-h-[300px]">
                   {mockTimeline.map((item, index) => (
                     <div key={index} className="flex relative pb-6 last:pb-0">
                       {index !== mockTimeline.length - 1 && (
                         <div className="absolute left-[3.5px] top-[14px] bottom-0 w-[1px] bg-[#e5e7eb]"></div>
                       )}
                       <div className="relative mt-[5px] shrink-0 mr-3">
                         <div className={`w-[8px] h-[8px] rounded-full ${item.dotColor}`}></div>
                       </div>
                       <div className="flex flex-col space-y-1 text-[14px]">
                         <span className="text-[#333] shrink-0">{item.time}</span>
                         <span className="text-[#333] leading-snug">{item.text}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
