import React, { useState } from 'react';
import { X, Zap, ChevronDown, Lock, Trash2 } from 'lucide-react';

interface InspectionItem {
  id: string;
  name: string;
  type: string;
  options: string;
  standard: string;
  unit: string;
  photo: boolean;
  isCustom?: boolean;
}

interface CreateInspectionObjectModalProps {
  onClose: () => void;
  mode?: 'device' | 'environment';
}

const TRANSFORMER_ITEMS: InspectionItem[] = [
  { id: '1', name: '变压器指示灯是否正常', type: '单选', options: '正常/异常', standard: '正常', unit: '-', photo: false },
  { id: '2', name: '是否有异常电磁轰鸣声或放电声', type: '单选', options: '无/有', standard: '无', unit: '-', photo: false },
  { id: '3', name: '温控仪显示的各相绕组温度', type: '数值', options: '-', standard: '80-130', unit: '℃', photo: true },
];

const ENV_ITEMS: InspectionItem[] = [
  { id: 'e1', name: '地面有无积水渗潮', type: '单选', options: '无/有', standard: '无', unit: '-', photo: true },
  { id: 'e2', name: '防鼠防小动物设施是否完好', type: '单选', options: '是/否', standard: '是', unit: '-', photo: false },
  { id: 'e3', name: '室内照明情况是否正常', type: '单选', options: '正常/异常', standard: '正常', unit: '-', photo: true },
];

export default function CreateInspectionObjectModal({ onClose, mode = 'device' }: CreateInspectionObjectModalProps) {
  const [objectName, setObjectName] = useState('');
  const [tempName, setTempName] = useState('');
  const [items, setItems] = useState<InspectionItem[]>([]);
  const [selectedTab, setSelectedTab] = useState('');

  const handleDeviceNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setObjectName(val);
    setTempName(val);
    setSelectedTab(val.split('--')[1] || val);
    if (val === '配电系统--变压器') {
      setItems([...TRANSFORMER_ITEMS]);
    } else {
      setItems([]);
    }
  };

  const commitEnvName = (val: string) => {
    setObjectName(val);
    setSelectedTab(val);
    if (val === '配电房环境') {
      setItems([...ENV_ITEMS]);
    } else {
      if (val === '') {
        setItems([]);
      }
    }
  };

  const handleEnvNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const handleEnvNameBlur = () => {
    commitEnvName(tempName);
  };

  const handleEnvNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
       commitEnvName(tempName);
       (e.target as HTMLInputElement).blur();
    }
  };

  const addItem = () => {
    const newItem: InspectionItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type: '单选',
      options: '是/否',
      standard: '是',
      unit: '-',
      photo: false,
      isCustom: true
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InspectionItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Reset fields when type changes
        if (field === 'type') {
          if (value === '单选') {
            updated.options = '是/否';
            updated.standard = '是';
            updated.unit = '-';
          } else {
            updated.options = '-';
            updated.standard = '';
            updated.unit = '℃';
          }
        }
        return updated;
      }
      return item;
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center pt-8 pb-8">
      <div className="bg-white rounded-lg w-[1100px] shadow-xl flex flex-col max-h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0] shrink-0">
          <h2 className="text-[16px] font-bold text-[#333]">新增巡检对象</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* Section: Object Info */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-[3px] h-[16px] bg-[#4281ed] mr-2"></div>
              <h3 className="text-[15px] font-bold text-[#4281ed]">对象信息</h3>
            </div>
            <div className="flex items-center">
              <label className="text-[14px] text-[#333] w-[80px] shrink-0">
                <span className="text-[#cb3131] mr-1">*</span>对象名称
              </label>
              {mode === 'device' ? (
                <div className="relative w-[280px]">
                  <select 
                    value={objectName}
                    onChange={handleDeviceNameChange}
                    className="w-full border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed] bg-white text-[#333] appearance-none"
                  >
                    <option value="">请选择对象名称</option>
                    <option value="配电系统--变压器">配电系统--变压器</option>
                    <option value="配电系统--电容柜">配电系统--电容柜</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-2.5 text-[#999] pointer-events-none" />
                </div>
              ) : (
                <div className="flex items-center space-x-3 w-full">
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={handleEnvNameChange}
                    onBlur={handleEnvNameBlur}
                    onKeyDown={handleEnvNameKeyDown}
                    placeholder="请输入对象名称（如：配电房环境）"
                    className="w-[280px] border border-[#dcdfe6] rounded-[4px] h-[36px] px-3 text-[14px] outline-none focus:border-[#4281ed]"
                  />
                  <span className="text-[#999] text-[13px]">注：配电房环境、水泵房环境、教学楼环境在系统中已有预设巡检项。</span>
                </div>
              )}
            </div>
          </section>

          {/* Section: Configure Inspection Items */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-[3px] h-[16px] bg-[#4281ed] mr-2"></div>
              <h3 className="text-[15px] font-bold text-[#4281ed]">配置巡检项</h3>
            </div>

            {objectName ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="bg-[#eaf1fe] text-[#4281ed] px-4 py-2 rounded-t-[4px] border-t border-x border-[#eaf1fe] flex items-center shadow-sm text-[14px] font-medium">
                      <Zap size={16} className="mr-2 text-[#ff9900]" fill="#ff9900" />
                      {mode === 'environment' && selectedTab === '配电房环境' ? '地点' : selectedTab}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-1.5 border border-[#e2e5e9] rounded-[4px] text-[13px] text-gray-400 bg-[#f9fafb] cursor-not-allowed">
                      批量删除
                    </button>
                    <button 
                      onClick={addItem}
                      className="px-4 py-1.5 bg-[#3b7fed] rounded-[4px] text-[13px] text-white hover:bg-blue-600 active:scale-95 transition-all flex items-center shadow-sm font-medium"
                    >
                      + 新增巡检项
                    </button>
                  </div>
                </div>

                <div className="border border-[#f0f0f0] rounded-sm overflow-hidden min-h-[300px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAFCFF] text-[#333] text-[13px] border-b border-[#f0f0f0]">
                        <th className="py-3 px-4 w-[50px] text-center">
                          <input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                        </th>
                        <th className="py-3 px-4 font-semibold w-[60px] text-center">序号</th>
                        <th className="py-3 px-4 font-semibold">巡检项名称</th>
                        <th className="py-3 px-4 font-semibold w-[120px]">判断类型</th>
                        <th className="py-3 px-4 font-semibold w-[120px]">可选项</th>
                        <th className="py-3 px-4 font-semibold w-[120px]">正常标准</th>
                        <th className="py-3 px-4 font-semibold w-[100px]">单位</th>
                        <th className="py-3 px-4 font-semibold w-[80px] text-center">拍照</th>
                        <th className="py-3 px-4 font-semibold w-[100px] text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-[#444]">
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-[#f5f5f5] hover:bg-[#fafafc] transition-colors group">
                          <td className="py-3.5 px-4 text-center">
                            {!item.isCustom ? (
                              <div className="flex justify-center">
                                <Lock size={16} className="text-orange-400 fill-orange-400/20" />
                              </div>
                            ) : (
                              <input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">{index + 1}</td>
                          <td className="py-3.5 px-4">
                            {item.isCustom ? (
                              <input 
                                type="text" 
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                placeholder="请输入巡检项名称"
                                className="w-full border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed]"
                              />
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {item.isCustom ? (
                               <select 
                                 value={item.type}
                                 onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                                 className="w-full border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed] bg-white"
                               >
                                 <option value="单选">单选</option>
                                 <option value="数值">数值</option>
                               </select>
                             ) : (
                               item.type
                             )}
                          </td>
                          <td className="py-3.5 px-4">
                            {item.isCustom ? (
                               item.type === '单选' ? (
                                 <select 
                                   value={item.options}
                                   onChange={(e) => updateItem(item.id, 'options', e.target.value)}
                                   className="w-full border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed] bg-white"
                                 >
                                   <option value="是/否">是/否</option>
                                   <option value="正常/异常">正常/异常</option>
                                 </select>
                               ) : (
                                 <div className="text-[#999]">-</div>
                               )
                             ) : (
                               item.options
                             )}
                          </td>
                          <td className="py-3.5 px-4">
                             {item.isCustom ? (
                                item.type === '单选' ? (
                                  <input 
                                    type="text" 
                                    value={item.standard}
                                    onChange={(e) => updateItem(item.id, 'standard', e.target.value)}
                                    className="w-full border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed]"
                                  />
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="text" 
                                      className="w-[50px] border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed]"
                                    />
                                    <span className="text-[#999]">-</span>
                                    <input 
                                      type="text" 
                                      className="w-[50px] border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed]"
                                    />
                                  </div>
                                )
                             ) : (
                               item.standard
                             )}
                          </td>
                          <td className="py-3.5 px-4">
                            {item.isCustom ? (
                               item.type === '单选' ? (
                                 <div className="text-[#999]">-</div>
                               ) : (
                                 <select 
                                   value={item.unit}
                                   onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                                   className="w-full border border-[#dcdfe6] rounded-[4px] h-[34px] px-2 outline-none focus:border-[#4281ed] bg-white"
                                 >
                                   <option value="℃">℃</option>
                                   <option value="V">V</option>
                                   <option value="A">A</option>
                                 </select>
                               )
                             ) : (
                               item.unit
                             )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {item.isCustom ? (
                              <input 
                                type="checkbox" 
                                checked={item.photo}
                                onChange={(e) => updateItem(item.id, 'photo', e.target.checked)}
                                className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                              />
                            ) : (
                              item.photo ? <svg width="16" height="16" viewBox="0 0 16 16" fill="black" className="mx-auto"><path d="M4 8L7 11L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> : null
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {item.isCustom && (
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-[#cb3131] hover:text-red-700 font-medium px-4 py-1 rounded border border-red-100 bg-red-50/30 hover:bg-red-50 transition-colors"
                              >
                                删除
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="border border-[#f0f0f0] rounded-sm overflow-hidden h-[300px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAFCFF] text-[#333] text-[13px] border-b border-[#f0f0f0]">
                      <th className="py-3 px-4 w-[50px] text-center">
                        <input type="checkbox" className="w-[14px] h-[14px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      </th>
                      <th className="py-3 px-4 font-semibold w-[60px] text-center">序号</th>
                      <th className="py-3 px-4 font-semibold">巡检项名称</th>
                      <th className="py-3 px-4 font-semibold w-[120px]">判断类型</th>
                      <th className="py-3 px-4 font-semibold w-[120px]">可选项</th>
                      <th className="py-3 px-4 font-semibold w-[120px]">正常标准</th>
                      <th className="py-3 px-4 font-semibold w-[100px]">单位</th>
                      <th className="py-3 px-4 font-semibold w-[80px] text-center">拍照</th>
                      <th className="py-3 px-4 font-semibold w-[100px] text-center">操作</th>
                    </tr>
                  </thead>
                </table>
                <div className="flex items-center justify-center h-[240px] text-gray-400 text-[14px]">
                  请先选择对象名称。
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#f0f0f0] shrink-0 space-x-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[#dcdfe6] rounded-[4px] text-[14px] text-[#666] hover:bg-gray-50 active:scale-95 transition-all font-medium"
          >
            取消
          </button>
          <button 
            className="px-6 py-2 bg-[#3b7fed] rounded-[4px] text-[14px] text-white hover:bg-blue-600 active:scale-95 transition-all shadow-sm font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
