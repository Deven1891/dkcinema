import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'

function MoviesList() {
    const sameClass = 'text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain'
    const dispatch = useDispatch()
    // all movies
    const { isLoading, isError, movies, pages, page } = useSelector(
        (state) => state.getAllMovies
    );

    // delete
    const { isLoading:deleteLoading, isError:deleteError } = useSelector(
        (state) => state.deleteMovie
    );

    // delete all
    const { isLoading:allLoading, isError:allError } = useSelector(
        (state) => state.deleteAllMovies
    );

    // delete movie handler
    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you to delete this movie?") &&
        dispatch(deleteMovieAction(id));
    }

    // delete all movies handler
    const deleteAllMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all movies?") &&
        dispatch(deleteAllMoviesAction());
    };
    
    // useEffect
    useEffect(() => {
        dispatch(getAllMoviesAction({}))
        // errors
        if (isError || deleteError || allError) {
            toast.error(isError || deleteError || allError);
        }
    }, [dispatch, isError, deleteError, allError]);

    // pagination next and prev pages
    const nextPage = () => {
        dispatch(getAllMoviesAction({
            pageNumber: page + 1
        }));
    };
    const prevPage = () => {
        dispatch(getAllMoviesAction({
            pageNumber: page - 1
        }));
    };

    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Movies List</h2>
                    {movies?.length > 0 && (
                        <button 
                            disabled={allLoading}
                            onClick={deleteAllMoviesHandler}
                            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'
                        >
                            {allLoading ? "Deleting..." : "Delete All"}
                        </button>
                    )} 
                </div>
                {isLoading || deleteLoading ? ( 
                    <Loader /> 
                ) : movies?.length > 0 ? ( 
                    <>
                        <Table 
                            data={movies} 
                            admin={true} 
                            onDeleteHandler={deleteMovieHandler}    
                        />
                        {/* Loading More */}
                        <div className='w-full flex-rows gap-6 my-5'>
                            <button 
                                onClick={prevPage} 
                                disabled={page === 1} 
                                className={sameClass}
                            >
                                <TbPlayerTrackPrev className="text-xl"/>
                            </button>
                            <button 
                                onClick={nextPage} 
                                disabled={page === pages} 
                                className={sameClass}
                            >
                                <TbPlayerTrackNext className="text-xl"/>
                            </button>    
                        </div>
                    </>
                ) : ( 
                    <Empty message="You have no movies" /> 
                )}
            </div>
        </SideBar>
    )
}

export default MoviesList
