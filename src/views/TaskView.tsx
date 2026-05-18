import React, { useState } from 'react';
import {
  FileText,
  Mail,
  User,
  CheckSquare,
  AlertTriangle,
  ChevronDown,
  Calendar
} from 'lucide-react';
import Pagination from '../components/Pagination';
import TaskDetailModal from './TaskDetailModal';

const tableData = [
  { id: 'XJ-20250802-05', name: '图书馆中心水泵房每日巡检', assignee: '周林鹏', status: '已逾期', time: '2025-07-23 08:00--12:00', result: '--' },
  { id: 'XJ-20250802-05', name: '学校总配电房每日巡检', assignee: '林零', status: '待执行', time: '2025-07-22 09:00--11:00', result: '--' },
  { id: 'XJ-20250802-01', name: '5号教学楼每月综合巡检', assignee: '周林鹏', status: '执行中', time: '2025-07-24 08:00--2025-07-26 11:00', result: '--' },
  { id: 'XJ-20250801-04', name: '普通配电房每周巡检', assignee: '李光', status: '已完成', time: '2025-07-24 08:00--16:00', result: '有异常' },
  { id: 'XJ-20250801-02', name: '普通配电房每周巡检', assignee: '林零', status: '已完成', time: '2025-07-22 09:00--17:00', result: '正常' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, string> = {
    '已逾期': 'bg-[#cb3131]',
    '待执行': 'bg-[#277cb3]',
    '执行中': 'bg-[#eaa24a]',
    '已完成': 'bg-[#7ab743]',
  };
  return (
    <span className={`${config[status] || 'bg-gray-500'} text-white text-[12px] px-2 py-[2px] rounded inline-flex items-center justify-center font-medium min-w-[50px]`}>
      {status}
    </span>
  );
};

export default function TaskView() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const filteredData = filterStatus 
    ? tableData.filter(item => item.status === filterStatus)
    : tableData;

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-[18px] bg-[#4281ed] mr-2.5 rounded-full" />
        <h2 className="text-[16px] font-bold text-gray-800 tracking-wide">巡检任务</h2>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div 
          onClick={() => setFilterStatus(null)}
          className={`bg-[#8b8cf8] text-white rounded-[16px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === null ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-xl"><FileText size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 ml-10">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">今日任务总数</span>
              <span className="text-[24px] font-bold leading-none">19</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('待执行')}
          className={`bg-[#277cb3] text-white rounded-[16px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '待执行' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-xl"><Mail size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 ml-10">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">待执行</span>
              <span className="text-[24px] font-bold leading-none">6</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('执行中')}
          className={`bg-[#eaa24a] text-white rounded-[16px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '执行中' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-xl"><User size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 ml-10">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">执行中</span>
              <span className="text-[24px] font-bold leading-none">8</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('已完成')}
          className={`bg-[#7ab743] text-white rounded-[16px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '已完成' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-xl"><CheckSquare size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 ml-10">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">已完成</span>
              <span className="text-[24px] font-bold leading-none">3</span>
          </div>
        </div>
        <div 
          onClick={() => setFilterStatus('已逾期')}
          className={`bg-[#cb3131] text-white rounded-[16px] h-[86px] flex items-center shadow-sm relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${filterStatus === '已逾期' ? 'scale-[1.03] shadow-md' : ''}`}
        >
          <div className="absolute left-[18px] bg-black/10 p-2 rounded-xl"><AlertTriangle size={28} className="opacity-90"/></div>
          <div className="w-full flex flex-col items-center pr-2 ml-10">
              <span className="text-[15px] mb-0.5 font-medium text-white/90">已逾期</span>
              <span className="text-[24px] font-bold leading-none">2</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-3 items-center">
          <input 
              type="text" 
              placeholder="请输入任务编号/名称" 
              className="border border-[#e2e5e9] rounded-[4px] px-3 py-1.5 text-[13px] w-[180px] focus:outline-blue-500 placeholder-[#999] bg-white transition-shadow" 
          />
          
          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[140px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择执行人</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <input 
                type="text" 
                placeholder="请选择计划执行时间/天" 
                className="border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[200px] focus:outline-blue-500 placeholder-[#555] bg-white cursor-pointer" 
            />
            <Calendar size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none border border-[#e2e5e9] rounded-[4px] pl-3 pr-8 py-1.5 text-[13px] w-[160px] focus:outline-blue-500 bg-white text-[#555] cursor-pointer">
              <option>请选择巡检结果</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2 text-[#999] pointer-events-none" />
          </div>

          <button 
            onClick={() => setFilterStatus(null)}
            className="border border-[#e2e5e9] bg-white text-[#555] px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f9fafb] active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center ml-1 cursor-pointer"
          >
              重置
          </button>
          <button className="bg-[#3b7fed] text-white px-4 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] w-[64px] flex items-center justify-center cursor-pointer">
              查询
          </button>
        </div>
        
        <button className="bg-[#3b7fed] text-white px-5 py-1.5 rounded-[4px] text-[13px] hover:bg-blue-600 active:scale-95 transition-all h-[32px] flex items-center justify-center shadow-sm font-medium mr-12 cursor-pointer">
          新增
        </button>
      </div>

      <div className="flex-1 w-full border border-[#f0f0f0] rounded-sm overflow-hidden mb-5">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="bg-[#FAFCFF] text-[#333] text-[13px] font-semibold border-b border-[#f0f0f0]">
              <th className="py-3 px-4 font-semibold w-[13%]">任务编号</th>
              <th className="py-3 px-4 font-semibold w-[18%]">任务名称</th>
              <th className="py-3 px-4 font-semibold w-[10%]">执行人</th>
              <th className="py-3 px-4 font-semibold w-[11%]">任务状态</th>
              <th className="py-3 px-4 font-semibold w-[18%]">计划执行时间</th>
              <th className="py-3 px-4 font-semibold w-[15%]">巡检结果</th>
              <th className="py-3 px-4 font-semibold w-[15%]">操作</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#444]">
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors">
                <td className="py-3.5 px-4">{row.id}</td>
                <td className="py-3.5 px-4">{row.name}</td>
                <td className="py-3.5 px-4">{row.assignee}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3.5 px-4">{row.time}</td>
                <td className="py-3.5 px-4 font-medium">
                    {row.result === '有异常' ? (
                        <span className="text-[#cb3131]">{row.result}</span>
                    ) : row.result === '正常' ? (
                        <span className="text-[#7ab743]">{row.result}</span>
                    ) : (
                        <span className="text-[#999]">{row.result}</span>
                    )}
                </td>
                <td className="py-3.5 px-4 flex items-center space-x-2 select-none h-full mt-0.5">
                  <button 
                    onClick={() => setSelectedTask(row)}
                    className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer"
                  >
                    查看
                  </button>
                  {row.status !== '执行中' && row.status !== '已完成' && (
                    <button className="border border-[#e5e7eb] text-gray-600 px-[14px] py-1 rounded shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-all bg-white cursor-pointer">
                      删除
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </>
  );
}
