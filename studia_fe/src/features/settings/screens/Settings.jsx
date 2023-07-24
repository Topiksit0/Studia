import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import SidebarSetting from '../components/SidebarSetting';
import { SettingContent } from '../components/SettingContent';

const Settings = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const [selectedOption, setSelectedOption] = useState('help');
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);


  return (
    <div className='h-screen w-full bg-white'>
      <Navbar user={user} />
      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <Sidebar section={'settings'} />
        <div className='container-fluid w-full rounded-tl-3xl bg-[#e7eaf886] '>
          <div className=' font-bold text-2xl h-full '>
            <div className='flex h-full  space-x-5'>
              <div className=' w-96 h-full rounded-tl-3xl flex flex-col'>
                <SidebarSetting  selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
              </div>
              <div className='p-2 w-full'>
                <SettingContent selectedOption={selectedOption} user={user} setSelectedOption={setSelectedOption}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(Settings);