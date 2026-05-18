import React, { useState } from 'react';
import { X, FileText, ChevronDown, ChevronUp, Copy } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  assignee: string;
  status: string;
  time: string;
  result: string;
}

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'abnormal'>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mock data based on status
  let locationText = '';
  let itemsList: any[] = [];
  let timelineItems: any[] = [];
  let taskDuration = '';
  let showTabs = false;
  
  const StatusStyle: Record<string, string> = {
    '已逾期': 'bg-[#cb3131]',
    '待执行': 'bg-[#277cb3]',
    '执行中': 'bg-[#eaa24a]',
    '已完成': 'bg-[#7ab743]',
  };

  if (task.status === '待执行') {
    locationText = '图书馆 / 一层、博学楼 / 一层';
    itemsList = [
      {
        location: '图书馆 / 一层',
        groups: [
          {
            name: '变压器',
            items: [
              { id: 'u1', type: '单选', name: '变压器指示灯是否正常', value: '正常', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'u2', type: '单选', name: '是否有异常电磁轰鸣声或放电声', value: '无', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'u3', type: '数值', name: '温控仪温度是否在正常范围内', value: '20~80℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]' },
            ]
          },
          {
            name: '配电房环境',
            items: [
              { id: 'u4', type: '单选', name: '配电房挡鼠板、防鼠网是否完好到位', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'u5', type: '单选', name: '地面是否干净、无积水、油污、杂物', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'u6', type: '数值', name: '配电房室内温度是否在正常范围内', value: '5~40℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]' },
            ]
          }
        ]
      }
    ];
    timelineItems = [
      { time: '2025-07-22 00:00', text: <>巡检任务由 <span className="text-[#3b7fed]">系统</span> 创建</>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (task.status === '执行中') {
    locationText = '5号教学楼 / 全楼';
    itemsList = [
      {
        location: '5号教学楼',
        groups: [
          {
            name: '照明灯具',
            items: [
              { id: 'e1', type: '单选', name: '照明灯具是否有问题', value: '无', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'e2', type: '单选', name: '照明控制面板是否存在异常', value: '正常', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'e3', type: '单选', name: '应急灯亮度是否符合标准', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
            ]
          },
          {
            name: '空调',
            items: [
              { id: 'e4', type: '单选', name: '中央空调外机是否完好', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'e5', type: '单选', name: '通风管道是否正常、无泄漏', value: '正常', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'e6', type: '数值', name: '空调出风口温度测量值', value: '22~26℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]' },
            ]
          }
        ]
      }
    ];
    timelineItems = [
      { time: '2025-07-22 00:00', text: <>巡检任务由 <span className="text-[#3b7fed]">系统</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 07:55', text: <><span className="text-[#3b7fed]">林零</span> 执行任务</>, dotColor: 'bg-[#3b7fed]' }
    ];
  } else if (task.status === '已逾期') {
    locationText = '图书馆 / B1层';
    itemsList = [
      {
        location: '图书馆 / B1层',
        groups: [
          {
            name: '变压器',
            items: [
              { id: 'o1', type: '单选', name: '变压器指示灯是否正常', value: '正常', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'o2', type: '单选', name: '是否有异常电磁轰鸣声或放电声', value: '无', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'o3', type: '数值', name: '温控仪温度是否在正常范围内', value: '20~80℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]' },
            ]
          },
          {
            name: '配电房环境',
            items: [
              { id: 'o4', type: '单选', name: '配电房挡鼠板、防鼠网是否完好到位', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'o5', type: '单选', name: '地面是否干净、无积水、油污、杂物', value: '是', typeColor: 'text-[#84c355] border-[#84c355]' },
              { id: 'o6', type: '数值', name: '配电房室内温度是否在正常范围内', value: '5~40℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]' },
            ]
          }
        ]
      }
    ];
    timelineItems = [
      { time: '2025-07-22 00:00', text: <>巡检任务由 <span className="text-[#3b7fed]">王主管</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 12:01', text: <><span className="text-[#3b7fed]">系统</span> <span className="text-[#cb3131]">任务逾期提醒</span></>, dotColor: 'bg-[#cb3131]' }
    ];
  } else if (task.status === '已完成') {
    showTabs = true;
    locationText = '图书馆 / 一层、博学楼 / 一层';
    taskDuration = '3小时10分钟';
    
    if (task.result === '有异常' || task.result === '处理中') {
      itemsList = [
        {
          location: '图书馆 / 一层',
          groups: [
            {
              name: '变压器',
              items: [
                { id: 'a1', type: '单选', name: '变压器指示灯是否正常', value: '异常', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: true, photos: [1, 2, 3], note: '变压器指示灯不亮。' },
                { id: 'a2', type: '单选', name: '是否有异常电磁轰鸣声或放电声', value: '无', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'a3', type: '数值', name: '温控仪温度是否在正常范围内', value: '43℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]', isAbnormal: false },
              ]
            },
            {
              name: '配电房环境',
              items: [
                { id: 'a4', type: '单选', name: '配电房挡鼠板、防鼠网是否完好到位', value: '是', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'a5', type: '单选', name: '地面是否干净、无积水、油污、杂物', value: '否', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: true, note: '地面存在水渍，有油污。' },
                { id: 'a6', type: '数值', name: '配电房室内温度是否在正常范围内', value: '22℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]', isAbnormal: false },
              ]
            }
          ]
        }
      ];
    } else {
      itemsList = [
        {
          location: '图书馆 / 一层',
          groups: [
            {
              name: '变压器',
              items: [
                { id: 'na1', type: '单选', name: '变压器指示灯是否正常', value: '正常', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'na2', type: '单选', name: '是否有异常电磁轰鸣声或放电声', value: '无', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'na3', type: '数值', name: '温控仪温度是否在正常范围内', value: '43℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]', isAbnormal: false },
              ]
            },
            {
              name: '配电房环境',
              items: [
                { id: 'na4', type: '单选', name: '配电房挡鼠板、防鼠网是否完好到位', value: '是', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'na5', type: '单选', name: '地面是否干净、无积水、油污、杂物', value: '是', typeColor: 'text-[#84c355] border-[#84c355]', isAbnormal: false },
                { id: 'na6', type: '数值', name: '配电房室内温度是否在正常范围内', value: '22℃', typeColor: 'text-[#7ca5f5] border-[#7ca5f5]', isAbnormal: false },
              ]
            }
          ]
        }
      ];
    }
    
    timelineItems = [
      { time: '2025-07-22 00:00', text: <>巡检任务由 <span className="text-[#3b7fed]">系统</span> 创建</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 07:55', text: <><span className="text-[#3b7fed]">林零</span> 执行任务</>, dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 11:05', text: (
        <div className="flex flex-col space-y-1 my-0.5">
            <div><span className="text-[#3b7fed]">林零</span> 巡检转工单</div>
            <div className="flex items-center text-[#3b7fed] cursor-pointer hover:underline">
                GD-20250801-104 <Copy size={13} className="ml-1" />
            </div>
        </div>
      ), dotColor: 'bg-[#3b7fed]' },
      { time: '2025-07-22 11:05', text: <><span className="text-[#3b7fed]">林零</span> 完成任务</>, dotColor: 'bg-[#7ab743]' }
    ];
  } else {
      locationText = '默认地点';
  }

  // Filter items if abnormal tab is selected
  let renderItemsList = itemsList;
  let abnormalCount = 0;
  
  if (showTabs) {
      // Calculate total items and abnormal items
      let total = 0;
      itemsList.forEach(locGroup => {
          locGroup.groups.forEach((group: any) => {
              group.items.forEach((item: any) => {
                  total++;
                  if (item.isAbnormal) abnormalCount++;
              });
          });
      });

      if (activeTab === 'abnormal') {
          renderItemsList = itemsList.map(locGroup => ({
              ...locGroup,
              groups: locGroup.groups.map((group: any) => ({
                  ...group,
                  items: group.items.filter((item: any) => item.isAbnormal)
              })).filter((group: any) => group.items.length > 0)
          })).filter(locGroup => locGroup.groups.length > 0);
      }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[900px] shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[18px] font-bold text-[#333]">巡检任务详情</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-[#edf3fd] to-[#f6f9fe] rounded-t-lg p-5 flex flex-col space-y-4">
             <div className="flex items-center space-x-3">
               <div className="w-[32px] h-[32px] bg-gradient-to-br from-blue-400 to-blue-500 rounded-[6px] flex items-center justify-center shadow-sm relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 transform -skew-x-[20deg] w-1/2 left-0"></div>
                   <FileText size={18} className="text-white relative z-10" />
               </div>
               <span className="text-[17px] font-bold text-[#333] tracking-wide">{task.name}</span>
               <span className={`${StatusStyle[task.status] || 'bg-gray-500'} text-white text-[12px] px-2.5 py-[3px] rounded-sm items-center justify-center font-medium shadow-sm`}>
                 {task.status}
               </span>
             </div>
             
             <div className="grid grid-cols-1 gap-3 relative mt-1">
                 <div className="flex items-center">
                     <span className="w-[120px] text-[15px] font-bold text-[#333]">执行人：</span>
                     <span className="text-[#333] text-[15px]">{task.assignee}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[120px] text-[15px] font-bold text-[#333]">计划执行时间：</span>
                     <span className="text-[#333] text-[15px]">{task.time}</span>
                 </div>
                 <div className="flex items-center">
                     <span className="w-[120px] text-[15px] font-bold text-[#333]">巡检地点：</span>
                     <span className="text-[#333] text-[15px]">{locationText}</span>
                 </div>
                 {showTabs && (
                     <>
                        <div className="flex items-center">
                             <span className="w-[120px] text-[15px] font-bold text-[#333]">任务总耗时：</span>
                             <span className="text-[#333] text-[15px]">{taskDuration}</span>
                         </div>
                         <div className="flex items-center">
                             <span className="w-[120px] text-[15px] font-bold text-[#333]">巡检结果：</span>
                             <span className={`text-[15px] ${task.result === '有异常' || task.result === '处理中' ? 'text-[#cb3131]' : 'text-[#7ab743]'}`}>
                                 {task.result === '无异常' ? '正常' : task.result}
                             </span>
                         </div>
                     </>
                 )}
             </div>
          </div>
          <div className="bg-[#f2f6fc]/40 h-4 rounded-b-lg mb-6"></div>

          {showTabs && (
            <div className="flex items-center mb-6 border border-[#e5e7eb] rounded-full w-max text-[14px]">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full transition-colors ${activeTab === 'all' ? 'bg-[#4078e8] text-white font-medium' : 'text-[#555] hover:bg-gray-50'}`}
              >
                全部项 (12)
              </button>
              <button 
                onClick={() => setActiveTab('abnormal')}
                className={`px-4 py-1.5 rounded-full transition-colors ${activeTab === 'abnormal' ? 'bg-[#4078e8] text-white font-medium' : 'text-[#555] hover:bg-gray-50'}`}
              >
                异常项 ({abnormalCount})
              </button>
            </div>
          )}

          <div className="flex space-x-6">
            {/* Left Column: Items */}
            <div className="flex-1">
              {!showTabs && <h3 className="text-[16px] font-bold text-[#333] mb-4">巡检项目清单</h3>}
              
              {renderItemsList.length === 0 ? (
                  <div className="py-20 text-center text-[#666] text-[14px]">
                      暂无异常项。
                  </div>
              ) : (
                  renderItemsList.map((locGroup, lgIndex) => (
                    <div key={lgIndex} className="mb-6">
                      <div className="text-[15px] text-[#333] mb-3">{locGroup.location}</div>
                      
                      {locGroup.groups.map((group: any, gIndex: number) => (
                        <div key={gIndex} className="bg-[#f5f7fa] rounded-lg p-4 mb-4 border border-[#eee]">
                          <div className="flex justify-between text-[13px] font-bold text-[#333] mb-3 px-3">
                            <span>{group.name}</span>
                            <span className="w-[120px] text-center">{showTabs ? '巡检结果' : '巡检标准'}</span>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            {group.items.map((item: any, iIndex: number) => (
                               <div key={iIndex} className="flex flex-col bg-white rounded border border-[#e8eBf0] overflow-hidden">
                                 <div 
                                    className={`flex items-center justify-between px-3 py-2 ${item.isAbnormal ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                                    onClick={(e) => item.isAbnormal ? toggleItem(e, item.id) : undefined}
                                 >
                                   <div className="flex items-center overflow-hidden flex-1 mr-4">
                                     <span className={`border ${item.typeColor} bg-transparent px-[8px] py-[1px] rounded-full text-[12px] whitespace-nowrap shrink-0 mr-3`}>
                                       {item.type}
                                     </span>
                                     <span className="text-[14px] text-[#444] truncate">{item.name}</span>
                                   </div>
                                   <div className="flex items-center shrink-0 w-[120px] justify-center">
                                     <span className={`text-[14px] ${item.isAbnormal ? 'text-[#cb3131]' : 'text-[#444]'}`}>{item.value}</span>
                                     {item.isAbnormal && (
                                         <span className="ml-1 text-[#cb3131]">
                                             {expandedItems[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                         </span>
                                     )}
                                   </div>
                                 </div>
                                 
                                 {item.isAbnormal && expandedItems[item.id] && (
                                     <div className="px-5 py-3 bg-[#f9fafc] border-t border-[#e8eBf0] text-[13px] flex flex-col space-y-4">
                                         {item.photos && item.photos.length > 0 && (
                                             <div className="flex items-start">
                                                 <span className="text-[#666] w-[70px] shrink-0 mt-1">现场照片：</span>
                                                 <div className="flex space-x-3">
                                                     {item.photos.map((p: number) => (
                                                         <div key={p} className="w-[80px] h-[60px] bg-[#dce6f9] flex flex-col items-center justify-center text-[#82a3ee] relative overflow-hidden">
                                                             <div className="w-[4px] h-[4px] rounded-full bg-[#82a3ee] mb-1"></div>
                                                             <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-[#82a3ee] absolute bottom-0 -ml-5"></div>
                                                             <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[25px] border-b-[#82a3ee] absolute bottom-0 ml-4 opacity-80"></div>
                                                         </div>
                                                     ))}
                                                 </div>
                                             </div>
                                         )}
                                         {item.note && (
                                             <div className="flex items-start">
                                                 <span className="text-[#666] w-[70px] shrink-0">补充说明：</span>
                                                 <span className="text-[#333]">{item.note}</span>
                                             </div>
                                         )}
                                     </div>
                                 )}
                               </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
              )}
            </div>

            {/* Right Column: Timeline */}
            <div className="w-[280px]">
               <div className="border border-[#f0f0f0] rounded-lg overflow-hidden">
                 <div className="bg-[#f9fafc] px-4 py-3 border-b border-[#f0f0f0]">
                   <h3 className="text-[15px] font-bold text-[#333]">记录处理时间线</h3>
                 </div>
                 <div className="p-5 flex flex-col bg-white min-h-[300px]">
                   {timelineItems.map((item, index) => (
                     <div key={index} className="flex relative pb-6 last:pb-0">
                       {/* Line */}
                       {index !== timelineItems.length - 1 && (
                         <div className="absolute left-[3.5px] top-[14px] bottom-0 w-[1px] bg-[#e5e7eb]"></div>
                       )}
                       {/* Dot */}
                       <div className="relative mt-[5px] shrink-0 mr-3">
                         <div className={`w-[8px] h-[8px] rounded-full ${item.dotColor}`}></div>
                       </div>
                       {/* Content */}
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

