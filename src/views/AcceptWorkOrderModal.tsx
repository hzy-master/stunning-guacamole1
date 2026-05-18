import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AcceptWorkOrderModalProps {
  onClose: () => void;
}

export default function AcceptWorkOrderModal({ onClose }: AcceptWorkOrderModalProps) {
  const [result, setResult] = useState<'通过' | '退回' | '重新指派' | null>(null);

  const renderPhotoGrid = () => {
    return (
      <div className="flex space-x-4 mt-3 mb-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-[100px] h-[66px] bg-[#e2e8f0] flex flex-col items-center justify-center relative overflow-hidden rounded-[3px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#94a3b8] mb-3 -ml-2"></div>
            <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[25px] border-b-[#4281ed] absolute bottom-0 -ml-10"></div>
            <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[35px] border-b-[#4281ed] absolute bottom-0 ml-10 opacity-90"></div>
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
          <h2 className="text-[18px] font-bold text-[#333]">验收结果</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scrollbar-thin">
          
          <div className="bg-[#fafafc] rounded-[6px] p-5 mb-6">
            <h3 className="text-[15px] font-bold text-[#333] mb-4">修复记录详情</h3>
            <p className="text-[14px] text-[#333] mb-3">
              通过更换1#主变压器A相侧外壳，对变压器进行修复，目前变压器外壳已恢复。
            </p>
            {renderPhotoGrid()}
            <div className="text-[14px] text-[#333]">
              维修总耗时：30分钟
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <div className="text-[14px] text-[#333] mb-4">
                <span className="text-[#cb3131] mr-1">*</span>验收结论
              </div>
              <div className="flex items-center space-x-8 pl-1">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="acceptResult" 
                    checked={result === '通过'} 
                    onChange={() => setResult('通过')}
                    className="w-[14px] h-[14px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed] mr-3"
                  />
                  <div className="w-[18px] h-[18px] rounded-[3px] bg-[#7ab743] flex items-center justify-center mr-1.5 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[14px] text-[#333]">验收通过</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="acceptResult" 
                    checked={result === '退回'} 
                    onChange={() => setResult('退回')}
                    className="w-[14px] h-[14px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed] mr-3"
                  />
                  <X size={20} className="text-[#cb3131] mr-1" strokeWidth={2.5}/>
                  <span className="text-[14px] text-[#333]">验收不通过(退回重改)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="acceptResult" 
                    checked={result === '重新指派'} 
                    onChange={() => setResult('重新指派')}
                    className="w-[14px] h-[14px] border-gray-300 text-[#4281ed] focus:ring-[#4281ed] mr-3"
                  />
                  <X size={20} className="text-[#cb3131] mr-1" strokeWidth={2.5}/>
                  <span className="text-[14px] text-[#333]">验收不通过(重新指派)</span>
                </label>
              </div>
            </div>

            {result === '重新指派' && (
              <div className="flex items-center space-x-6">
                 <div className="flex items-center flex-1">
                   <div className="text-[14px] text-[#333] shrink-0 text-left pr-3">
                     <span className="text-[#cb3131] mr-1">*</span>负责人
                   </div>
                   <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                     <option value="林零">林零（当前0单）</option>
                   </select>
                 </div>
                 <div className="flex items-center flex-1">
                   <div className="text-[14px] text-[#333] shrink-0 text-left pr-3">
                     <span className="text-[#cb3131] mr-1">*</span>要求完成时间
                   </div>
                   <select className="flex-1 border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333]">
                     <option value="30分钟之内">30分钟之内</option>
                   </select>
                 </div>
              </div>
            )}

            <div>
              <div className="text-[14px] text-[#333] mb-2">
                {result !== '通过' && <span className="text-[#cb3131] mr-1">*</span>}验收意见
              </div>
              <textarea 
                placeholder="填写评价或退回原因..." 
                className="w-full border border-[#dcdfe6] rounded-[4px] h-[120px] p-3 text-[14px] outline-none focus:border-[#4281ed] placeholder-[#b4bccc] resize-none" 
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 flex justify-end space-x-4 bg-white rounded-b-lg mt-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#dcdfe6] rounded-[4px] text-[14px] text-[#606266] hover:text-[#4281ed] hover:border-[#4281ed] transition-colors bg-white cursor-pointer"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-[#4281ed] text-white rounded-[4px] text-[14px] hover:bg-[#3668be] transition-colors shadow-sm cursor-pointer">
            提交
          </button>
        </div>
      </div>
    </div>
  );
}
